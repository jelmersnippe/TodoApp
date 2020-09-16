import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { StateProvider, reducer, initialState } from './src/StateProvider'

import {
  ProjectsOverview,
  SpecificProject,
  AddProjectScreen,
  AddTodoItemScreen,
} from './src/screens';

const Stack = createStackNavigator()

const App = () => {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Projects Overview">
          <Stack.Screen name="Projects Overview" component={ProjectsOverview} options={{ title: 'All Projects'}} />
          <Stack.Screen name="Specific Project" component={SpecificProject} />
          <Stack.Screen name="Add Project" component={AddProjectScreen} />
          <Stack.Screen name="Add Todo Item" component={AddTodoItemScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </StateProvider>
  )
}

export default App
