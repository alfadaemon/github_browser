'use strict';

import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableHighlight
    } from 'react-native';

var Login = React.createClass({
    render : function(){
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>Github Browser</Text>
                <Image style={styles.logo}
                    source={require('image!Octocat')} />
                <TextInput style={styles.input}
                    placeholder="Github username" />
                <TextInput style={styles.input}
                    placeholder="Github password"
                    secureTextEntry={true} />
                <TouchableHighlight style={styles.button}>
                    <Text style={styles.buttonText}>
                        Login
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
});

//Colors Sheet
var academicCircleBlueColor = '#ececff';// '#28618e';

var styles = StyleSheet.create({
    container: {
        backgroundColor: academicCircleBlueColor,
        paddingTop: 50,
        alignItems: 'center',
        padding: 40,
        flex: 1
    },
    logo:{
        width:66,
        height:55
    },
    heading: {
        fontSize: 30,
        color: 'black',
        marginBottom: 20
    },
    input: {
        height: 40,
        margin: 10,
        padding: 10,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48bbec',
        backgroundColor: 'white'
    },
    button: {
        height: 40,
        padding: 10,
        backgroundColor: '#48bbec',
        alignSelf: 'stretch',
        alignItems: 'center',
        margin: 20,
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold'
    }
})

module.exports = Login;