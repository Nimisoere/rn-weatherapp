/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  KeyboardAvoidingView,
  ImageBackground,
} from 'react-native';
import SearchInput from './components/SearchInput';
import getImageForWeather from './utils/getImageForWeather';

const App: () => React$Node = () => {
  const [location, setLocation] = useState('Lagos');

  const updateLocation = locationValue => {
    setLocation(locationValue);
  };
  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <ImageBackground
        source={getImageForWeather('Clear')}
        style={styles.imageContainer}
        imageStyle={styles.image}>
        <View style={styles.detailsContainer}>
          <Text style={[styles.largeText, styles.textStyle]}>{location}</Text>
          <Text style={[styles.smallText, styles.textStyle]}>Light Cloud</Text>
          <Text style={[styles.largeText, styles.textStyle]}>24°</Text>
          <SearchInput
            placeholder="Search any city"
            onSubmit={updateLocation}
          />
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: 'white',
  },
  textStyle: {
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    color: 'white',
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20,
  },
});

export default App;
