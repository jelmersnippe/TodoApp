import React, {useEffect} from 'react';
import {Text, Alert} from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useStateProviderValue, actions, projectsKey} from '../StateProvider';
import AsyncStorage from '@react-native-community/async-storage';
import {GetNextId} from '../Utils/GetNextId';

const TodoListOverview = ({navigation}) => {
  const [{projects}, dispatch] = useStateProviderValue();

  const addProject = (title) => {
    dispatch({
      type: actions.addProject,
      project: {id: GetNextId(projects), title: title, todos: []},
    });
  };

  const getProjects = async () => {
    return await AsyncStorage.getItem(projectsKey);
  };

  const removeProject = (project) => {
    Alert.alert(`Delete "${project.title}"`, `Are you sure?`, [
      {
        text: 'Cancel',
      },
      {
        text: 'Delete',
        onPress: () => {
          dispatch({
            type: actions.removeProject,
            projectId: project.id,
          });
        },
      },
    ]);
  };

  useEffect(() => {
    getProjects()
      .then((response) => {
        if (response && response.length !== 0) {
          dispatch({
            type: actions.setProjects,
            projects: JSON.parse(response),
          });
        }
      })
      .catch((error) => {
        alert('Error getting your todos: \n' + error);
      });
  }, []);

  return (
    <ScreenWrapper>
      <AddButton
        onPress={() =>
          navigation.navigate('Input Screen', {
            headerText: 'Add Todo List',
            title: 'New Todo List',
            inputPlaceholder: 'New Todo List',
            submitText: 'Add',
            callback: (value) => addProject(value),
          })
        }>
        <Icon style={{marginRight: 8}} name="plus" color="black" />
        <Text>Add Todo List</Text>
      </AddButton>
      <ProjectList
        data={projects}
        renderItem={({item}) => (
          <ProjectItem
            onPress={() =>
              navigation.navigate('Specific Todo List', {projectId: item.id})
            }>
            <IconButton onPress={() => removeProject(item)}>
              <Icon name="times" />
            </IconButton>
            <Text>{item.title}</Text>
            <Icon
              style={{marginLeft: 'auto', padding: 4}}
              name="arrow-right"
              color="black"
            />
          </ProjectItem>
        )}
        keyExtractor={(item, index) => `list-item-${index}`}
      />
    </ScreenWrapper>
  );
};

export default TodoListOverview;

const ScreenWrapper = styled.SafeAreaView`
  flex: 1;
  padding: 16px;
`;

const ProjectList = styled.FlatList`
  padding: 8px 0;
`;

const ProjectItem = styled.TouchableOpacity`
  margin-bottom: 8px;
  padding: 8px;
  border: 2px solid black;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
`;

const AddButton = styled.TouchableOpacity`
  border: 1px solid black;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  align-self: flex-end;
  padding: 8px 16px;
`;

const IconButton = styled.TouchableOpacity`
  padding: 4px;
  margin: 0 4px;
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
`;
