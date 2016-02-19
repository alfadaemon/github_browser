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
  View
} from 'react-native';

<<<<<<< HEAD
class GithubNav extends Component {
=======
class GithubBrowser extends Component {
>>>>>>> 8223c1c32a92a5a9e3b45b08185263b851f9b017
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

<<<<<<< HEAD
AppRegistry.registerComponent('GithubNav', () => GithubNav);
=======
AppRegistry.registerComponent('GithubBrowser', () => GithubBrowser);
>>>>>>> 8223c1c32a92a5a9e3b45b08185263b851f9b017
