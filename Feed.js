/**
 * Created by alfadaemon on 2/20/16.
 */

'use strict'

import React, {
    Component,
    StyleSheet,
    Text,
    View,
    ListView,
    ActivityIndicatorIOS,
    Image,
    TouchableHighlight
    } from 'react-native'

var AuthService = require('./AuthService')
var moment = require('moment')
var PushPayload = require('./PushPayload')

class Feed extends React.Component{
    constructor(props){
        super(props)

        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1!=r2
        })

        this.state = {
            dataSource : ds.cloneWithRows(['A', 'B', 'C']),
            showProgress: true
        }
    }

    componentDidMount(){
        this.fetchFeed()
    }

    render(){
        if(this.state.showProgress){
            return(
                <View style={styles.loading}>
                    <ActivityIndicatorIOS
                        size='large'
                        animating={true}
                        />
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)}
                        />
                </View>
            )
        }
    }

    fetchFeed(){
        AuthService.getAuthInfo((err, authInfo)=>{
            if(err)
                throw err

            if(!authInfo)
                return cb()

            var url = 'https://api.github.com/users/' +
                authInfo.user.login +
                '/received_events'

            fetch(url, {
                headers: authInfo.header
            })
                .then((response) => response.json())
                .then((responseData) => {
                    var feedItems = responseData.filter((ev)=>ev.type=='PushEvent')
                    this.setState({
                        dataSource: this.state.dataSource
                            .cloneWithRows(feedItems),
                        showProgress:false
                    })
                }).catch((err)=>{
                    throw err
                })

        })
    }

    validateObj(obj){
        return(obj!==undefined && obj!==null)
    }

    renderRow(rowData) {
        if (this.validateObj(rowData.id))
            return (
                <TouchableHighlight
                    onPress={()=>this.pressRow(rowData)}
                    underlayColor='#ddd'>
                    <View style={styles.row}>
                        <Image
                            source= {{uri:rowData.actor.avatar_url}}
                            style= {styles.avatar}
                            />
                        <View style={styles.rowInfo}>
                            <Text>
                                {moment(rowData.created_at).fromNow()}
                            </Text>
                            <Text>
                                {rowData.actor.login}
                            </Text>
                            <Text>
                                {rowData.payload.ref.replace('refs/heads/','')}
                            </Text>
                            <Text style={styles.rowInfoRepository}>
                                {rowData.repo.name}
                            </Text>
                        </View>
                    </View>
                </TouchableHighlight>
            )
        else
            return <Text style={styles.row}> {rowData} </Text>
    }

    pressRow(rowData){
        //console.log('rowData: '+JSON.stringify(rowData))
        this.props.navigator.push({
                title: 'Push Event',
                component: PushPayload,
                passProps: {
                    pushEvent: rowData
                }
            }
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop:60
    },
    loading: {
        flex:1,
        justifyContent:'center',
        paddingTop:20
    },
    row: {
        flex:1,
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        borderColor: '#D7D7D7',
        borderBottomWidth: 1
    },
    rowInfo: {
        paddingLeft: 20
    },
    rowInfoRepository: {
        fontWeight: 'bold'
    },
    avatar:{
        height: 36,
        width: 36,
        borderRadius: 18,
        margin:15
    }
})

module.exports = Feed