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
            projectId: route.params.projectId,
            todo: {id: getNextId(), title: 'new todo', status: STATUS.todo}
        })
    }

    const removeTodoItem = (todoId) => {
        dispatch({
            type: actions.removeTodoItem,
            projectId: route.params.projectId,
            todoId: todoId,
        })
    }

    const setTodoItemDone = (todoId) => {
        dispatch({
            type: actions.setTodoItemStatus,
            projectId: route.params.projectId,
            todoId: todoId,
            status: STATUS.done,
        })
    }

    const renderItem = ( {item} ) => {
        if(item.status === STATUS.done) {
            return (
                <DoneItem>
                    <Text>{item.title} - {item.id} - {item.status}</Text>
                </DoneItem>
            )
        }
        return (
            <TodoItem>
                <IconButton onPress={() => removeTodoItem(item.id)}><Icon name="times" /></IconButton>
                <Text>{item.title} - {item.id} - {item.status}</Text>
                <MainActions>
                    <IconButton onPress={() => alert('Edit item')}><Icon name="pen" /></IconButton>
                    <IconButton onPress={() => setTodoItemDone(item.id)}><Icon name="check" /></IconButton>
                </MainActions>
            </TodoItem>
        )
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <Title>Specific Project {route.params.projectId}</Title>
            <AddButton onPress={() => addTodoItem()}><Text>Add todo item</Text><Icon name="plus" /></AddButton>
            <FlatList
                data={todos}
                renderItem={renderItem}
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

const DoneItem = styled.View`
    flex-direction: row;
    align-items: center;
    margin: 8px;
    padding: 8px;
    border: 1px solid rebeccapurple;
    background: #ccc;
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
