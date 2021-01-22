import React, { useState,useEffect } from 'react';
import { View, StyleSheet, Text, TouchableHighlight, Alert} from 'react-native';
import { Picker } from '@react-native-community/picker';

const Form = ({ moneda, criptomoneda, guardarMoneda, guardarCriptoMoneda, setConsultarAPI }) => {

    const [ criptomonedas, guardarCriptoMonedas ] = useState([]);

    useEffect(() => {
        const consultarAPI = async () => {
            const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;
            const resp = await fetch( url );
            const {Data} = await resp.json();
            guardarCriptoMonedas(Data);
        }
        consultarAPI();
    }, [])

    // Almacena las selecciones del usuario
    const obtenerMoneda = (moneda) => {
        guardarMoneda(moneda);
    }
    const obtenercriptoMoneda = (cripto) => {
        guardarCriptoMoneda(cripto);
    }

    // Validacion
    const cotizarPrecio = () => {
        if( moneda.trim() === '' || criptomoneda.trim() === '' ) {
            mostrarAlerta();
            return ;
        }
        // Pasa correctamente la validacion 
        setConsultarAPI(true);
    }

    // Alert de Error 
    const mostrarAlerta = () => {
        Alert.alert(
            'Error',
            'Debe seleccionar Moneda y Criptomoneda',
            [
                {text: 'OK'}
            ]
        )
    }

    /* IMPLEMENTANDO @react-native-community/picker */
    return (
        <View>
            <Text style={ styles.label }>Moneda</Text>
            <Picker
                itemStyle={{ height: 120 }}
                selectedValue={ moneda }
                onValueChange={ moneda => obtenerMoneda(moneda) }
            > 
                <Picker.Item label="-Seleccione-" value="" />
                <Picker.Item label="Dolar de Estados Unidos" value="USD" />
                <Picker.Item label="Euro" value="EUR" />
                <Picker.Item label="Libra Esterlina" value="GBP" />
                <Picker.Item label="Peso Argentino" value="ARS" />
                <Picker.Item label="Peso Mexicano" value="MXN" />

            </Picker>

            <Text style={ styles.label }>Criptomoneda</Text>
            <Picker
                itemStyle={{ height: 120 }}
                selectedValue={ criptomoneda }
                onValueChange={ cripto => obtenercriptoMoneda(cripto) }
            > 
                <Picker.Item label="-Seleccione-" value="" />
                {
                    criptomonedas.map( cripto => ( 
                        <Picker.Item key={cripto.CoinInfo.Id} label={cripto.CoinInfo.FullName} value={cripto.CoinInfo.Name} />
                    ))
                }
            </Picker>
            
            <View style={ styles.btnContainer }>
                <TouchableHighlight 
                    style={ styles.btnCotizar }
                    onPress={ cotizarPrecio }
                >
                    <Text style={ styles.textCotizar }>Cotizar</Text>
                </TouchableHighlight>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    label: {
        fontFamily: 'Lato-Black',
        fontSize: 24,
        marginVertical: 25,
        textAlign: 'center',
        textTransform: 'uppercase'
    },
    btnContainer: {
        marginTop: 30,
        display: 'flex',
        alignItems: 'center',
    },
    btnCotizar: {
        backgroundColor: '#5E49E2',
        borderRadius: 3,
        paddingVertical: 10,
        width: '75%',
    },
    textCotizar: {
        color: '#FFF',
        fontFamily: 'Lato-Regular',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'uppercase'
    }
});

export default Form;
