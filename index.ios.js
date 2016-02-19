/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    ActivityIndicatorIOS
    } from 'react-native';

var Login = require('./Login.js')
var AuthService = require('./AuthService')
var AppContainer = require('./AppContainer')

class GithubNav extends Component {
  //Called only one time, once the component is loaded
  componentDidMount(){
    AuthService.getAuthInfo((err, authInfo)=>{
      this.setState({
        checkingAuth: false,
        isLoggedIn: authInfo != null
      })
    })
  }

  constructor(props){
    super(props)
    this.state = {isLoggedIn : false, checkingAuth: true}
    this.onLogin = this.onLogin.bind(this)
  }

  render() {
    if(this.state.checkingAuth){
      return(
          <View style={styles.container}>
            <ActivityIndicatorIOS
                animation={true}
                size='large'
                style={styles.loader} />
          </View>
      )
    }
    if(this.state.isLoggedIn){
      return(
          <AppContainer />
      )
    } else {
      return (
          < Login onLogin={this.onLogin}/>
      );
    }
  };

  onLogin() {
    this.setState({isLoggedIn : true})
    console.log('Login successful')
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});

AppRegistry.registerComponent('GithubNav', () => GithubNav);
