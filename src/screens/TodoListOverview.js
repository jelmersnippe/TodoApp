import React, {useEffect} from 'react';
import {Text, StyleSheet} from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useStateProviderValue, actions, projectsKey} from '../StateProvider';
import AsyncStorage from '@react-native-community/async-storage';

const TodoListOverview = ({navigation}) => {
  const [{projects}, dispatch] = useStateProviderValue();

  const getProjects = async () => {
    return await AsyncStorage.getItem(projectsKey);
  };

  const removeProject = (projectId) => {
    dispatch({
      type: actions.removeProject,
      projectId: projectId,
    });
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
      <Icon.Button
        style={styles.addButton}
        name="plus"
        backgroundColor="transparent"
        color="black"
        onPress={() => navigation.navigate('Add Todo List')}>
        <Text>Add Todo List</Text>
      </Icon.Button>
      <ProjectList
        data={projects}
        renderItem={({item}) => (
          <ProjectItem
            onPress={() =>
              navigation.navigate('Specific Todo List', {projectId: item.id})
            }>
            <IconButton onPress={() => removeProject(item.id)}>
              <Icon name="times" />
            </IconButton>
            <Text>To {item.title}</Text>
          </ProjectItem>
        )}
        keyExtractor={(item, index) => `list-item-${index}`}
      />
    </ScreenWrapper>
  );
};

export default TodoListOverview;

const styles = StyleSheet.create({
  addButton: {
    borderWidth: 1,
    borderRadius: 8,
    marginLeft: 'auto',
  },
});

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
  border: 2px solid rebeccapurple;
  border-radius: 8px;
  background: violet;
  flex-direction: row;
  align-items: center;
`;

const AddButton = styled.TouchableOpacity`
  border: 1px solid black;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  align-self: flex-end;
`;

const IconButton = styled.TouchableOpacity`
  padding: 4px;
  border: 1px solid black;
  margin: 0 4px;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
`;
