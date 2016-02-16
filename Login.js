'use strict';

import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableHighlight,
    ActivityIndicatorIOS
    } from 'react-native';

class Login extends Component{
    constructor(props){
        super(props);

        this.state = {loginInProgress: false}
    }

    render(){
        var errorCtr = < View />

        if(!this.state.loginSuccess && this.state.badCredentials){
            errorCtr = <Text style={styles.error}>
                The username and password combination did not work!
                </Text>;
        }
        if(!this.state.loginSuccess && this.state.unknownError){
            errorCtr = <Text style={styles.error}>
                We face some difficulties, please try again!
            </Text>;
        }

        return (
            <View style={styles.container}>
                <Text style={styles.heading}>Github Browser</Text>
                <Image style={styles.logo}
                    source={require('image!Octocat')} />
                <TextInput style={styles.input}
                    onChangeText = {(text)=> this.setState({username: text})}
                    placeholder="Your Github username" />
                <TextInput style={styles.input}
                    onChangeText = {(password)=> this.setState({password: password})}
                    placeholder="Your Github password"
                    secureTextEntry={true} />
                <TouchableHighlight style={styles.button}
                    onPress={this.onLoginPressed.bind(this)}>
                    <Text style={styles.buttonText}>
                        Login
                    </Text>
                </TouchableHighlight>

                {errorCtr}

                <ActivityIndicatorIOS
                    animating={this.state.loginInProgress}
                    size='large'
                    style= {styles.loader} />
            </View>
        );
    }

    onLoginPressed(){
        this.setState({loginInProgress : true})

        var authService = require('./AuthService')
        authService.login(
            {username: this.state.username, password: this.state.password},
            (results) => {
                this.setState(Object.assign({loginInProgress: false}, results))

                if(results.loginSuccess && this.props.onLogin){
                    this.props.onLogin()
                }
            }
        )
    }
}

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
    },
    loader: {
        padding: 20
    },
    error: {
        color: 'red',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

module.exports = Login;