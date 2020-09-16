import React, { createContext, useContext, useReducer } from "react";

// Create the Context
export const StateProviderContext = createContext();

// Create and export the DataLayer component that can be initiated with a reducer, state and children
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateProviderContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateProviderContext.Provider>
);

// Set and export the method to consume the context
export const useStateProviderValue = () => useContext(StateProviderContext);

// Set the initial state
export const initialState = {
    projects: [],
}

// Set the available actions
export const actions = {
    addProject: 'ADD_PROJECT',
    removeProject: 'REMOVE_PROJECT',
    addTodoItem: 'ADD_TODO_ITEM',
    removeTodoItem: 'REMOVE_TODO_ITEM',
    setTodoItemStatus: 'SET_TODO_ITEM_STATUS',
}

// Handling for all actions
export const reducer = (state, action) => {
    switch(action.type) {
        case "ADD_PROJECT":
            return {
                ...state,
                projects: [action.project, ...state.projects]
            }
        case "REMOVE_PROJECT":
            return {
                ...state,
                projects: state.projects.filter((project) => project.id !== action.projectId)
            }
        case "ADD_TODO_ITEM":
            var project = state.projects.find((project) => project.id === action.projectId);
            project.todos = [action.todo, ...project.todos];
            
            var filteredProjects = state.projects.filter((project) => project.id !== action.projectId)

            return {
                ...state,
                projects: [project, ...filteredProjects]
            }
        case "REMOVE_TODO_ITEM":
            var project = state.projects.find((project) => project.id === action.projectId);
            project.todos = project.todos.filter((todo) => todo.id != action.todoId);

            var filteredProjects = state.projects.filter((project) => project.id !== action.projectId)

            return {
                ...state,
                projects: [project, ...filteredProjects]
            }
        case "SET_TODO_ITEM_STATUS":
            var project = state.projects.find((project) => project.id === action.projectId);
            var todo = project.todos.find((todo) => todo.id === action.todoId);
            todo.status = action.status;

            var filteredTodos = project.todos.filter((todo) => todo.id !== action.todoId)
            project.todos = [todo, ...filteredTodos];
            
            var filteredProjects = state.projects.filter((project) => project.id !== action.projectId)

            return {
                ...state,
                projects: [project, ...filteredProjects]
            }
        default:
            return state;
    }
}