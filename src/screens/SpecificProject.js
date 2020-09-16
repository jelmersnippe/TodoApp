import React, { useState, useEffect } from 'react'
import { FlatList, SafeAreaView, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import styled from 'styled-components'
import { useStateProviderValue, actions } from '../StateProvider';

const STATUS = {
    todo: "todo",
    inProgress: "in progress",
    done: "done",
}

const SpecificProject = ({route, navigation}) => {
    const [{ projects }, dispatch] = useStateProviderValue();
    const [todos, setTodos] = useState([])

    useEffect(() => {
        setTodos(projects.find((project) => project.id === route.params.projectId).todos)
    }, [projects, route.params.projectId])

    const getNextId = () => {
        // Loop through all project items
        // Return the largest number id
        // Then add 1 and return this as the 'Next Id'
        return todos.reduce((acc, cur) => {
            if (cur.id > acc) return cur.id
            else return acc
        }, 0) + 1;
    }

    const addTodoItem = () => {
        dispatch({
            type: actions.addTodoItem,
            id: route.params.projectId,
            todo: {id: getNextId(), title: 'new todo', status: STATUS.todo}
        })
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <Title>Specific Project {route.params.projectId}</Title>
            <AddButton onPress={() => addTodoItem()}><Text>Add todo item</Text><Icon name="plus" /></AddButton>
            <FlatList
                data={todos}
                renderItem={({item}) => (
                    <TodoItem>
                        <IconButton onPress={() => alert('Remove item')}><Icon name="times" /></IconButton>
                        <Text>{item.title} - {item.id}</Text>
                        {item.status !== STATUS.done && 
                        <MainActions>
                            <IconButton onPress={() => alert('Edit item')}><Icon name="pen" /></IconButton>
                            <IconButton onPress={() => alert('Set item as done')}><Icon name="check" /></IconButton>
                        </MainActions>
                        }
                    </TodoItem>
                )}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}

export default SpecificProject



const Title = styled.Text`
    font-size: 16px;
    color: rebeccapurple;
    text-align: center;
    padding: 16px 0;
`

const TodoItem = styled.View`
    flex-direction: row;
    align-items: center;
    margin: 8px;
    padding: 8px;
    border: 1px solid rebeccapurple;
`

const MainActions = styled.View`
    margin-left: auto;
    flex-direction: row;
`

const IconButton = styled.TouchableOpacity`
    padding: 4px;
    border: 1px solid black;
    margin: 0 4px;
    width: 24px;
    height: 24px;
    border-radius: 12px;
    justify-content: center;
    align-items: center;
`

const AddButton = styled.TouchableOpacity`
    border: 1px solid black;
    border-radius: 8px;
    padding: 8px;
    flex-direction: row;
    align-items: center;
    align-self: flex-end;
`
