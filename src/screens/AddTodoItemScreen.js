import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { useStateProviderValue, actions } from '../StateProvider';
import { STATUS } from './SpecificTodoList';

const AddTodoItemScreen = ({navigation, route}) => {
    const [value, onChangeText] = useState('');
    const [{}, dispatch] = useStateProviderValue();

    const getNextId = () => {
        // Loop through all project items
        // Return the largest number id
        // Then add 1 and return this as the 'Next Id'
        return route.params.todos.reduce((acc, cur) => {
            if (cur.id > acc) return cur.id
            else return acc
        }, 0) + 1;
    }

    const addTodoItem = (title) => {
        dispatch({
            type: actions.addTodoItem,
            projectId: route.params.projectId,
            todo: {id: getNextId(), title: title, status: STATUS.todo}
        })
        navigation.goBack();
    }

    return (
        <View>
            <Text>Enter the name you want to give the new todo item</Text>
            <TextInput 
                placeholder="New Todo Item" 
                onChangeText={text => onChangeText(text)}
                value={value}
                autoFocus={true}
            />
            <TouchableOpacity onPress={() => addTodoItem(value)}><Text>Submit</Text></TouchableOpacity>
        </View>
    )
}

export default AddTodoItemScreen
