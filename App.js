import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StateProvider, reducer, initialState} from './src/StateProvider';

import {TodoListOverview, SpecificTodoList, InputScreen} from './src/screens';

const Stack = createStackNavigator();

const App = () => {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Todo List Overview">
          <Stack.Screen
            name="Todo List Overview"
            component={TodoListOverview}
            options={{title: 'All Todo Lists'}}
          />
          <Stack.Screen
            name="Specific Todo List"
            component={SpecificTodoList}
          />
          <Stack.Screen name="Input Screen" component={InputScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </StateProvider>
  );
};

export default App;
