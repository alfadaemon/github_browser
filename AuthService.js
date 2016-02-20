/**
 * Created by alfadaemon on 2/16/16.
 */

'use strict';

import Buffer from 'buffer'
import _ from 'lodash'
import React, {
    AsyncStorage
    } from 'react-native'

const authKey = 'auth'
const userKey = 'user'

class AuthService {
    getAuthInfo(cb){
        return AsyncStorage.multiGet(//multiGet(['k1', 'k2'], cb) -> cb([['k1', 'val1'], ['k2', 'val2']])
            [authKey,userKey],
            (err, val)=>{
                if(err)
                    return cb(err)

                if(!val)
                    return cb()

                var zippedObj = _.fromPairs(val) //zipObject(val[0],val[1])

                if(!zippedObj[authKey])
                    return cb()

                var authInfo = {
                    header:{
                        Authorization : 'Basic '+zippedObj[authKey]
                    },
                    user: JSON.parse(zippedObj[userKey])
                }

                return cb(null, authInfo)
            }
        )
    }

    logout(cb){
        AsyncStorage.multiRemove([authKey, userKey],
            (err)=>{
                if(err)
                    throw err

                return cb({isLoggedIn : false, checkingAuth: true})
            })
    }

    login(creds, cb){
        var b = new Buffer.Buffer(creds.username+':'+creds.password)
        var encodedAuth = b.toString('base64')

        fetch('https://api.github.com/user', {
            headers: {
                'Authorization': 'Basic ' + encodedAuth
            }
        })
            .then((response)=>{
                if(response.status>=200 && response.status<300)
                    return response;

                throw {
                    badCredentials : response.status == 401,
                    unknownError : response.status != 401
                }
            })
            .then((response)=>{
                return response.json()
            })
            .then((results)=>{
                AsyncStorage.multiSet(//multiSet([['k1', 'val1'], ['k2', 'val2']], cb);
                    [[authKey, encodedAuth], [userKey, JSON.stringify(results)]],
                    (err)=>{
                        if(err){
                            throw err
                        }
                        return cb({loginSuccess: true})
                    })
            })
            .catch((err)=>{
                return cb(err)
            })
    }
}

module.exports = new AuthService()