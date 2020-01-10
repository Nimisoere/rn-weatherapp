/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  KeyboardAvoidingView,
  ImageBackground,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {fetchLocationId, fetchWeather} from './utils/api';
import SearchInput from './components/SearchInput';
import getImageForWeather from './utils/getImageForWeather';

const App = () => {
  const [data, setData] = useState({location: 'New york'});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateLocation = async locationValue => {
    setLoading(true);
    try {
      const locationId = await fetchLocationId(locationValue);
      const {location, weather, temperature} = await fetchWeather(locationId);
      setLoading(false);
      setError(null);
      setData({
        weather,
        temperature,
        location,
      });
    } catch (fetchError) {
      setLoading(false);
      setError(fetchError);
    }
  };

  useEffect(() => {
    updateLocation(data.location);
  }, [data.location]);

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={getImageForWeather(data?.weather)}
        style={styles.imageContainer}
        imageStyle={styles.image}>
        <View style={styles.detailsContainer}>
          <ActivityIndicator animating={loading} color="white" size="large" />
          {!loading && (
            <>
              {!!error && (
                <Text style={[styles.largeText, styles.textStyle]}>
                  Could not load weather, Please try a different city
                </Text>
              )}
              {!error && (
                <>
                  <Text style={[styles.largeText, styles.textStyle]}>
                    {data?.location}
                  </Text>
                  <Text style={[styles.smallText, styles.textStyle]}>
                    {data?.weather}
                  </Text>
                  <Text style={[styles.largeText, styles.textStyle]}>
                    {`${Math.round(data?.temperature)}°`}
                  </Text>
                </>
              )}
            </>
          )}
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
