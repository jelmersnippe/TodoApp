import React, {useState, useEffect} from 'react';
import {Text, TextInput} from 'react-native';
import styled from 'styled-components';

const InputScreen = ({route, navigation}) => {
  const {
    headerText,
    title,
    initialValue,
    inputPlaceholder,
    submitText,
    callback,
  } = route.params;
  const [value, onChangeText] = useState(initialValue ? initialValue : '');

  useEffect(() => {
    navigation.setOptions({
      title: headerText ? headerText : title,
    });
  }, [title]);

  return (
    <ScreenWrapper>
      <FormWrapper>
        <Title>{title}</Title>
        <TextInput
          placeholder={inputPlaceholder ? inputPlaceholder : 'Type here..'}
          onChangeText={(text) => onChangeText(text)}
          value={value}
          autoFocus={true}
        />
        <SubmitButton
          onPress={() => {
            callback(value);
            navigation.goBack();
          }}>
          <Text>{submitText ? submitText : 'Submit'}</Text>
        </SubmitButton>
      </FormWrapper>
    </ScreenWrapper>
  );
};

export default InputScreen;

const ScreenWrapper = styled.SafeAreaView`
  flex: 1;
  padding: 16px;
  justify-content: center;
  align-items: center;
`;

const FormWrapper = styled.View`
  display: flex;
  flex-direction: column;
`;

const Title = styled.Text`
  font-weight: bold;
  font-size: 20px;
`;

const SubmitButton = styled.TouchableOpacity`
  padding: 8px 16px;
  border: 1px solid black;
  border-radius: 8px;
  align-items: center;
`;
