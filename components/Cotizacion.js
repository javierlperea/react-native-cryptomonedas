import React from 'react';
import { View, Text, StyleSheet } from 'react-native'

const Cotizacion = ({ resultado }) => {

    // Cuando el objeto venga vacio no lo muestra
    if( Object.keys(resultado).length === 0 ) return null;

    return (
        <View style={ styles.resultado }>  
            <Text style={[ styles.texto, styles.precio ]}>
                <Text style={ styles.span }>{resultado.PRICE}</Text>  
            </Text>

            <Text style={ styles.texto }>Precio más alto del día: { ' ' }
                <Text style={ styles.span }> {resultado.HIGHDAY}</Text>  
            </Text>

            <Text style={ styles.texto }>Precio más bajo del día: { ' ' }
                <Text style={ styles.span }>{resultado.LOWDAY}</Text>  
            </Text>

            <Text style={ styles.texto }>Variación las ultimas 24 hs: { ' ' }
                <Text style={ styles.span }>{resultado.CHANGEPCT24HOUR}</Text>  
            </Text>

            <Text style={ styles.texto }>Ultima actualizacion: { ' ' }
                <Text style={ styles.span }>{resultado.LASTUPDATE}</Text>  
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    resultado: {
        backgroundColor: '#5E49E2',
        padding: 20,
    },
    texto: {
        color: '#FFF',
        fontSize: 15,
        marginBottom: 10,
        textAlign: 'center'
    },
    // Para aplicar herencia de codigo trabajo con arreglos en los selectores <Text style={[ styles.texto, styles.precio ]}>
    precio: {
        fontSize: 35
    },
    span: {
        fontWeight: 'bold'
    }
});

export default Cotizacion;
