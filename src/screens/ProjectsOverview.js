import React from 'react'
import { SafeAreaView, FlatList, Text } from 'react-native'
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useStateProviderValue, actions } from '../StateProvider';

const ProjectsOverview = ({navigation}) => {
    const [{projects}, dispatch] = useStateProviderValue();

    const removeProject = (projectId) => {
        dispatch({
            type: actions.removeProject,
            projectId: projectId
        })
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <Title>Projects Overview</Title>
            <AddButton onPress={() => navigation.navigate('Add Project')}>
                <Text>Add project</Text><Icon name="plus" />
            </AddButton>
            <FlatList
                data={projects}
                renderItem={({item}) => (
                    <ProjectItem onPress={() => navigation.navigate('Specific Project', {projectId: item.id})}>
                        <IconButton onPress={() => removeProject(item.id)}><Icon name="times" /></IconButton>
                        <Text>To {item.title}</Text>
                    </ProjectItem>
                )}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}

export default ProjectsOverview

const Title = styled.Text`
    font-size: 16px;
    color: rebeccapurple;
    text-align: center;
    padding: 16px 0;
`

const ProjectItem = styled.TouchableOpacity`
    margin: 8px;
    padding: 8px;
    border: 2px solid rebeccapurple;
    border-radius: 8px;
    background: violet;
    flex-direction: row;
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
