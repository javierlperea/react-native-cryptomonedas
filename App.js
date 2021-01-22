import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, ScrollView, ActivityIndicator } from 'react-native';

import { Header } from './components/Header';
import Form from './components/Form';
import Cotizacion from './components/Cotizacion';

const App = () => {

  const [ moneda, guardarMoneda ] = useState('');
  const [ criptomoneda, guardarCriptoMoneda ] = useState('');
  const [ consultarAPI, setConsultarAPI ] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [loading, setLoading] = useState(false);

  // controlando la ejecicion
  useEffect( () => {
      const cotizarCriptomoneda = async () => {
          if( consultarAPI ){
              const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${ criptomoneda }&tsyms=${ moneda }`;
              const resp = await fetch(url);
              const { DISPLAY } = await resp.json();

              // Cuando ya tengo una cotizacion muestro el spinner
              setLoading(true);

              setTimeout(() => {
                guardarResultado(DISPLAY[criptomoneda][moneda]);
                setConsultarAPI(false);
                // Oculto el spinner
                setLoading(false);
                
              }, 1000);
          }
      }
      cotizarCriptomoneda();
  },[consultarAPI])

  // Mostrar el spinner o el resultado 
  const showComponent = loading ? <ActivityIndicator size="large" color="#5E49E2" /> : <Cotizacion resultado={ resultado } />

  return (
    <ScrollView>
        <Header />

        <View>
            <Image 
              style={ styles.image }
              source={ require('./assets/img/cryptomonedas.png') }
            />
        </View>

        <View style={ styles.content }>
            <Form 
              moneda={ moneda }
              criptomoneda={ criptomoneda }
              guardarMoneda={ guardarMoneda }
              guardarCriptoMoneda={ guardarCriptoMoneda }
              setConsultarAPI={ setConsultarAPI }
            />
        </View>

        <View style={{ marginTop: 40 }}>
          { showComponent }
        </View>
    </ScrollView>
  );

}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 150
  },
  content: {
    marginHorizontal: '2.5%'
  }
});

export default App;