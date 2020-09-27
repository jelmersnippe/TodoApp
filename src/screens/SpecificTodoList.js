import React, {useState, useEffect} from 'react';
import {Alert, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styled from 'styled-components';
import {useStateProviderValue, actions} from '../StateProvider';
import {GetNextId} from '../Utils/GetNextId';
import {TitleAlreadyInUse} from '../Utils/TitleAlreadyInUse';

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

  const updateTodoItemTitle = (id, title) => {
    TitleAlreadyInUse(todos, title)
      ? alert('Title already in use')
      : dispatch({
          type: actions.setTodoItemTitle,
          projectId: route.params.projectId,
          todoId: id,
          title: title,
        });
  };

  const addTodoItem = (title) => {
    TitleAlreadyInUse(todos, title)
      ? alert('Title already in use')
      : dispatch({
          type: actions.addTodoItem,
          projectId: route.params.projectId,
          todo: {id: GetNextId(todos), title: title, status: STATUS.todo},
        });
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
          <DoneText>{item.title}</DoneText>
        </DoneItem>
      );
    }
    return (
      <TodoItem>
        <IconButton onPress={() => removeTodoItem(item)}>
          <Icon name="times" />
        </IconButton>
        <Text>{item.title}</Text>
        <MainActions>
          <IconButton
            onPress={() => {
              navigation.navigate('Input Screen', {
                headerText: `Update "${item.title}"`,
                title: `Update "${item.title}"`,
                initialValue: item.title,
                submitText: 'Update',
                callback: (value) => {
                  updateTodoItemTitle(item.id, value);
                },
              });
            }}>
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
          navigation.navigate('Input Screen', {
            headerText: 'Add Todo Item',
            title: 'New Todo Item',
            inputPlaceholder: 'New Todo Item',
            submitText: 'Add',
            callback: addTodoItem,
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
  position: relative;
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
  padding: 8px;
  border: 1px solid black;
  background: #ccc;
`;

const DoneText = styled.Text`
  text-decoration: line-through;
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
