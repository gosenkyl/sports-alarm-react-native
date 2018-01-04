import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function(props){
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#0D4D4D" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});