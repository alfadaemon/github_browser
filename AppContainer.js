/**
 * Created by alfadaemon on 2/17/16.
 */

'use strict'

import React, {
    Component,
    StyleSheet,
    Text,
    View,
    TabBarIOS
    } from 'react-native'

class AppContainer extends Component{
    constructor(props){
        super(props)

        this.state = {
            selectedTab: 'feed'
        }
    }

    render(){
        return(
            <TabBarIOS style={styles.container}>
                <TabBarIOS.Item
                    title="Feed"
                    selected={this.state.selectedTab=='feed'}
                    onPress={()=>this.setState({selectedTab: 'feed'})}>
<<<<<<< HEAD
                    <Text style={styles.welcome}> This is the Feed tab </Text>
=======
                    <Text style={styles.welcome}> This is Tab 1 </Text>
>>>>>>> 8223c1c32a92a5a9e3b45b08185263b851f9b017
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="Search"
                    selected={this.state.selectedTab=='search'}
                    onPress={()=>this.setState({selectedTab: 'search'})}>
<<<<<<< HEAD
                    <Text style={styles.welcome}> This is the Search tab </Text>
=======
                    <Text style={styles.welcome}> This is Tab 2 </Text>
>>>>>>> 8223c1c32a92a5a9e3b45b08185263b851f9b017
                </TabBarIOS.Item>
            </TabBarIOS>
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