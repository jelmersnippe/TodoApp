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
    addTodoItem: 'ADD_TODO_ITEM',
}

// Handling for all actions
export const reducer = (state, action) => {
    switch(action.type) {
        case "ADD_PROJECT":
            return {
                ...state,
                projects: [action.project, ...state.projects]
            }
        case "ADD_TODO_ITEM":
            // Get the todos for the project in state with the given id
            // Then add the new todo to the ecisting array of todos
            var project = state.projects.find((project) => project.id === action.id);
            project.todos = [action.todo, ...project.todos];
            
            // Get all projects that don't match the given id
            // This is essentially the same as removing the updated project from the projects array
            var filteredProjects = state.projects.filter((project) => project.id !== action.id)

            // Return the state with the updated projects
            // where the updated project is placed at the start of the projects array
            return {
                ...state,
                projects: [project, ...filteredProjects]
            }
        default:
            return state;
    }
}