import React from 'react';
import { Text, StyleSheet, View, Platform} from 'react-native'

export const Header = () => {
    return (
        <>
            <Text style={ styles.header }>Criptomonedas</Text>
        </>
    )
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#5E49E2',
        color: '#FFF',
        fontSize: 24,
        fontFamily: 'Lato-Black',
        marginBottom: 30,
        paddingTop: Platform.OS === 'ios' ? 40 : 20,
        paddingBottom: 10,
        textAlign: 'center',
        textTransform: 'uppercase'
    }
});
