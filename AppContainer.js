/**
 * Created by alfadaemon on 2/17/16.
 */

'use strict'

import React, {
    Component,
    StyleSheet,
    Text,
    View,
    TabBarIOS,
    TouchableHighlight,
    ActivityIndicatorIOS
    } from 'react-native'

var Login = require('./Login')

class AppContainer extends Component{
    constructor(props){
        super(props)

        this.state = {
            selectedTab: 'feed'
        }
    }

    render(){
        if(this.state.checkingAuth){
            return(
                < Login />
            )
        }
        return(
            <TabBarIOS style={styles.container}>
                <TabBarIOS.Item
                    title="Feed"
                    selected={this.state.selectedTab=='feed'}
                    systemIcon='most-recent'
                    onPress={()=>this.setState({selectedTab: 'feed'})}>
                    <Text style={styles.welcome}> This is the Feed tab </Text>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="Search"
                    selected={this.state.selectedTab=='search'}
                    systemIcon = 'search'
                    onPress={()=>this.setState({selectedTab: 'search'})}>
                    <Text style={styles.welcome}> This is the Search tab </Text>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="LogOut"
                    selected={this.state.selectedTab=='logout'}
                    onPress={this.onLogOutPressed.bind(this)}>
                        <Text style={styles.buttonText}>
                            LogOut
                        </Text>
                </TabBarIOS.Item>
            </TabBarIOS>
        )
    }

    onLogOutPressed(){
        this.setState({loginInProgress : false})

        var authService = require('./AuthService')
        authService.logout(
            (results) => {
                this.setState(Object.assign({loginInProgress: false}, results))
            }
        )

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
        padding: 20,
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    }
})

module.exports = AppContainer