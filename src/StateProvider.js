import React, {createContext, useContext, useReducer} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export const projectsKey = 'projects';

// Create the Context
export const StateProviderContext = createContext();

// Create and export the DataLayer component that can be initiated with a reducer, state and children
export const StateProvider = ({reducer, initialState, children}) => (
    <StateProviderContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateProviderContext.Provider>
);

// Set and export the method to consume the context
export const useStateProviderValue = () => useContext(StateProviderContext);

// Set the initial state
export const initialState = {
    projects: [],
};

// Set the available actions
export const actions = {
    setProjects: 'SET_PROJECTS',
    addProject: 'ADD_PROJECT',
    removeProject: 'REMOVE_PROJECT',
    addTodoItem: 'ADD_TODO_ITEM',
    removeTodoItem: 'REMOVE_TODO_ITEM',
    setTodoItemStatus: 'SET_TODO_ITEM_STATUS',
    setTodoItemTitle: 'SET_TODO_ITEM_TITLE',
};

// Handling for all actions
export const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_PROJECTS':
            AsyncStorage.setItem(projectsKey, JSON.stringify(action.projects));
            return {
                ...state,
                projects: action.projects,
            };
        case 'ADD_PROJECT':
            var newProjectsObject = [action.project, ...state.projects];
            AsyncStorage.setItem(projectsKey, JSON.stringify(newProjectsObject));
            return {
                ...state,
                projects: newProjectsObject,
            };
        case 'REMOVE_PROJECT':
            var newProjectsObject = state.projects.filter(
                (project) => project.id !== action.projectId,
            );
            AsyncStorage.setItem(projectsKey, JSON.stringify(newProjectsObject));
            return {
                ...state,
                projects: newProjectsObject,
            };
        case 'ADD_TODO_ITEM':
            var project = state.projects.find(
                (project) => project.id === action.projectId,
            );
            project.todos = [action.todo, ...project.todos];

            var filteredProjects = state.projects.filter(
                (project) => project.id !== action.projectId,
            );

            var newProjectsObject = [project, ...filteredProjects];
            AsyncStorage.setItem(projectsKey, JSON.stringify(newProjectsObject));

            return {
                ...state,
                projects: newProjectsObject,
            };
        case 'REMOVE_TODO_ITEM':
            var project = state.projects.find(
                (project) => project.id === action.projectId,
            );
            project.todos = project.todos.filter((todo) => todo.id !== action.todoId);

            var filteredProjects = state.projects.filter(
                (project) => project.id !== action.projectId,
            );

            var newProjectsObject = [project, ...filteredProjects];
            AsyncStorage.setItem(projectsKey, JSON.stringify(newProjectsObject));

            return {
                ...state,
                projects: newProjectsObject,
            };
        case 'SET_TODO_ITEM_TITLE':
            var project = state.projects.find(
                (project) => project.id === action.projectId,
            );
            var todo = project.todos.find((todo) => todo.id === action.todoId);
            todo.title = action.title;

            var filteredTodos = project.todos.filter(
                (todo) => todo.id !== action.todoId,
            );

            project.todos = [todo, ...filteredTodos];

            var filteredProjects = state.projects.filter(
                (project) => project.id !== action.projectId,
            );

            var newProjectsObject = [project, ...filteredProjects];
            AsyncStorage.setItem(projectsKey, JSON.stringify(newProjectsObject));

            return {
                ...state,
                projects: newProjectsObject,
            };
        case 'SET_TODO_ITEM_STATUS':
            var project = state.projects.find(
                (project) => project.id === action.projectId,
            );
            var todo = project.todos.find((todo) => todo.id === action.todoId);
            todo.status = action.status;

            var filteredTodos = project.todos.filter(
                (todo) => todo.id !== action.todoId,
            );

            var todoItems = filteredTodos.filter((todo) => todo.status === 'todo');
            var doneItems = filteredTodos.filter((todo) => todo.status === 'done');

            project.todos =
                todo.status === 'done'
                    ? [...todoItems, todo, ...doneItems]
                    : [todo, ...todoItems, ...doneItems];

            var filteredProjects = state.projects.filter(
                (project) => project.id !== action.projectId,
            );

            var newProjectsObject = [project, ...filteredProjects];
            AsyncStorage.setItem(projectsKey, JSON.stringify(newProjectsObject));

            return {
                ...state,
                projects: newProjectsObject,
            };
        default:
            return state;
    }
};
