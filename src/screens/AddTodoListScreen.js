import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { useStateProviderValue, actions } from '../StateProvider';

const AddTodoListScreen = ({navigation}) => {
    const [value, onChangeText] = useState('');
    const [{projects}, dispatch] = useStateProviderValue();

    const getNextId = () => {
        // Loop through all project items
        // Return the largest number id
        // Then add 1 and return this as the 'Next Id'
        return projects.reduce((acc, cur) => {
            if (cur.id > acc) return cur.id
            else return acc
        }, 0) + 1;
    }

    const addProject = (title) => {
        dispatch({
            type: actions.addProject, 
            project: {id: getNextId(), title: title, todos: []}
        })
        navigation.goBack();
    }

    return (
        <View>
            <Text>Enter the name you want to give the new todo list</Text>
            <TextInput 
                placeholder="New Todo List" 
                onChangeText={text => onChangeText(text)}
                value={value}
                autoFocus={true}
            />
            <TouchableOpacity onPress={() => addProject(value)}><Text>Submit</Text></TouchableOpacity>
        </View>
    )
}

export default AddTodoListScreen
