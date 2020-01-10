import React, {useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import PropTypes from 'prop-types';

const SearchInput = ({placeholder, onSubmit}) => {
  const [place, setPlace] = useState('');
  const handleSubmitEditing = () => {
    if (!place) {
      return;
    }

    onSubmit(place);
    setPlace('');
  };
  return (
    <View style={styles.container}>
      <TextInput
        autoCorrect={false}
        placeholder={placeholder}
        placeholderTextColor="white"
        underlineColorAndroid="transparent"
        style={styles.textInput}
        clearButtonMode="always"
        value={place}
        onChangeText={value => setPlace(value)}
        onSubmitEditing={handleSubmitEditing}
      />
    </View>
  );
};

SearchInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

SearchInput.defaultProps = {
  placeholder: '',
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    marginTop: 20,
    backgroundColor: '#666',
    marginHorizontal: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  textInput: {
    flex: 1,
    color: 'white',
  },
});

export default SearchInput;
