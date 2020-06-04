import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import Ball from './Ball';


export default function Accel() {
  const [data, setData] = useState({});

  useEffect(() => {
    _toggle();
  }, []);

  useEffect(() => {
    return () => {
      _unsubscribe();
    };
  }, []);

  const _toggle = () => {
    if (this._subscription) {
      _unsubscribe();
    } else {
      _subscribe();
    }
  };


  const _slow = () => {
    Accelerometer.setUpdateInterval(1000);
  };

  const _fast = () => {
    Accelerometer.setUpdateInterval(16);
  };

  const _subscribe = () => {
    this._subscription = Accelerometer.addListener(accelerometerData => {
      setData(accelerometerData);
    });
  };

  const _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  const _reset = () => {
    setData(0,0,0);
    _unsubscribe();
  }

  let { x, y, z } = data;
  return ( 
    <View style={styles.sensor}>
      <Text style={styles.text}>Accelerometer</Text>
      <Text style={styles.text}>
        x: {round(x)} y: {round(y)} z: {round(z)}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={_toggle} style={styles.button}>
          <Text>toggle</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_slow} style={styles.button}>
          <Text>Slow</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_fast} style={styles.button}>
          <Text>Fast</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_reset} style={styles.button}>
          <Text>reset</Text>
        </TouchableOpacity>
      </View>
      <Ball position={data}/>
    </View>
  );
}

function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 100) / 100;
}

const styles = StyleSheet.create({
  sensor:{
    backgroundColor:'beige',
    marginVertical:50,
    marginHorizontal:25,
    height:500,
    borderColor:'black',
    borderWidth:2,
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  },
  text:{
    backgroundColor:'pink'
  },
  buttonContainer:{
  },
  button:{
    marginVertical:15,
    width:100,
    height:50,
    backgroundColor:'orange',
    borderWidth:1,
    borderColor:'black',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    fontSize:20,
  },
})