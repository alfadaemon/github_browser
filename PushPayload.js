/**
 * Created by alfadaemon on 2/23/16.
 */
'use strict'

import React, {
    Component,
    StyleSheet,
    Text,
    View,
    Image,
    ListView
} from 'react-native'

var moment = require('moment')

class PushPayload extends Component {
    constructor(props) {
        super(props)

        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        })

        this.state = {
            pushEvent: props.pushEvent,
            dataSource: ds.cloneWithRows(props.pushEvent.payload.commits)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerHeader}>
                    <Image
                        style={styles.avatar}
                        source = {{uri: this.state.pushEvent.actor.avatar_url}}
                    />
                    <Text style={styles.infoText}>
                        {moment(this.state.pushEvent.created_at).fromNow()}
                    </Text>
                    <Text style={styles.infoText}>
                        {this.state.pushEvent.actor.login}
                    </Text>
                    <Text style={styles.infoText}>
                        {this.state.pushEvent.repo.name}
                    </Text>
                </View>
                <View style={{paddingTop:20, alignItems:'center'}}>
                    <Text>
                        {this.state.pushEvent.payload.commits.length} commit(s)
                    </Text>
                </View>
                <ListView
                    automaticallyAdjustContentInsets ={false}
                    dataSource={this.state.dataSource}
                    renderRow = {this.renderRow.bind(this)}
                    >
                </ListView>
            </View>
        )
    }

    renderRow(row){
        return(
            <View style={styles.row}>
                <Text style={styles.rowText}>
                    {row.message}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    containerHeader:{
        alignItems: 'center',
        paddingTop: 60
    },
    infoText: {
        fontWeight: 'bold',
        color: 'black'
    },
    row:{
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#D7D7D7',
        borderWidth: 1,
        padding: 5,
        marginTop: 5
    },
    rowText:{
      flex:1,
      paddingLeft:20,
      color: 'grey'
    },
    avatar:{
        height: 120,
        width: 120,
        borderRadius: 60,
        margin:15
    }
})

module.exports = PushPayload