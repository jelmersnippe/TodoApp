import React, {useState, useEffect} from 'react';
import {Alert, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styled from 'styled-components';
import {useStateProviderValue, actions} from '../StateProvider';

export const STATUS = {
  todo: 'todo',
  inProgress: 'in progress',
  done: 'done',
};

const SpecificTodoList = ({route, navigation}) => {
  const [{projects}, dispatch] = useStateProviderValue();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setTodos(
      projects.find((project) => project.id === route.params.projectId).todos,
    );
    navigation.setOptions({
      title: projects.find((project) => project.id === route.params.projectId)
        .title,
    });
  }, [projects, route.params.projectId]);

  const removeTodoItem = (todo) => {
    Alert.alert(`Delete "${todo.title}"`, `Are you sure?`, [
      {
        text: 'Cancel',
      },
      {
        text: 'Delete',
        onPress: () => {
          dispatch({
            type: actions.removeTodoItem,
            projectId: route.params.projectId,
            todoId: todo.id,
          });
        },
      },
    ]);
  };

  const setTodoItemDone = (todoId) => {
    dispatch({
      type: actions.setTodoItemStatus,
      projectId: route.params.projectId,
      todoId: todoId,
      status: STATUS.done,
    });
  };

  const renderItem = ({item}) => {
    if (item.status === STATUS.done) {
      return (
        <DoneItem>
          <Text>{item.title}</Text>
        </DoneItem>
      );
    }
    return (
      <TodoItem>
        <IconButton onPress={() => removeTodoItem(item)}>
          <Icon name="times" />
        </IconButton>
        <Text>
          {item.title} - {item.status}
        </Text>
        <MainActions>
          <IconButton onPress={() => alert('Edit item')}>
            <Icon name="pen" />
          </IconButton>
          <IconButton onPress={() => setTodoItemDone(item.id)}>
            <Icon name="check" />
          </IconButton>
        </MainActions>
      </TodoItem>
    );
  };

  return (
    <ScreenWrapper>
      <AddButton
        onPress={() =>
          navigation.navigate('Add Todo Item', {
            projectId: route.params.projectId,
            todos: todos,
          })
        }>
        <Icon style={{marginRight: 8}} name="plus" color="black" />
        <Text>Add Todo Item</Text>
      </AddButton>
      <TodoList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item, index) => `list-item-${index}`}
      />
    </ScreenWrapper>
  );
};

export default SpecificTodoList;

const ScreenWrapper = styled.SafeAreaView`
  flex: 1;
  padding: 16px;
`;

const TodoList = styled.FlatList`
  padding: 8px 0;
`;

const TodoItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
  padding: 8px;
  border: 1px solid black;
`;

const DoneItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
  padding: 8px;
  border: 1px solid black;
  background: #ccc;
`;

const MainActions = styled.View`
  margin-left: auto;
  flex-direction: row;
`;

const IconButton = styled.TouchableOpacity`
  padding: 4px;
  margin: 0 4px;
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
`;

const AddButton = styled.TouchableOpacity`
  border: 1px solid black;
  border-radius: 8px;
  padding: 8px 16px;
  flex-direction: row;
  align-items: center;
  align-self: flex-end;
`;
