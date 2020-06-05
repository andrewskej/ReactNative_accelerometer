import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios';


export default function Ball({position}){
    let {x, y ,z} = position;
    let [left, top] = [(x * -200)+ 150  , (y * 500) + 10 ]  
    //adding 150 and 10 is just like margin. but why multiplying -200 and 500?

    console.log('RN x:', Math.ceil(left, 1), 
                'y:', Math.ceil(top,1), 
                'z:', Math.round(z,1))

    //this should update the coord to node server, yet axios keeps failing now
    // localhost in here refers to the device itself, so I need a real ip to wire up
    let url = 'http://192.168.2.76:3002/update'; 
    fetch(url, {
        method: "POST",
        body: JSON.stringify({
            left, top
        }),
        headers: {
            "Content-Type": "application/json"
        },
    })
    .catch(err => { console.log('error:', err) })


    return(
        <View style={{...styles.ball, left:Math.ceil(left,1) || 0,  top:Math.ceil(top,1) || 0 }}></View>
    )

}



const styles = StyleSheet.create({
    ball:{
        backgroundColor:'red',
        width:50,
        height:50,
        borderRadius:100,
        position:'absolute',
    }
})
