import { useReducer, createContext } from "react";

import {
  SEND,
  SUCCESS,
  ADD_TAG,
  INPUT_VALUE_CHANGE,
  INPUT_BLUR_CHANGE,
  RESET_INPUT,
} from "./types";

export const AppContext = createContext();

const initialState = {
  studentData: {
    data: [],
    error: null,
    status: null,
  },
  nameFilter: { value: "", isTouched: false },
  tagFilter: { value: "", isTouched: false },
};

const appReducer = (state, action) => {
  console.log("action.type", action.type);
  switch (action.type) {
    case SEND:
      return {
        ...state,
        studentData: {
          ...state.studentData,
          status: action.startingStatus ? "pending" : null,
        },
      };
    case SUCCESS:
      return {
        ...state,
        studentData: {
          ...state.studentData,
          data: action.responseData,
          status: "completed",
        },
      };
    case ADD_TAG:
      const sampleStudents = [...state.studentData.data];
      let finalStudents = [];
      sampleStudents.forEach((student) => {
        let tags = [];
        if (student.id === action.payload.id) {
          tags = [...student.tags, action.payload.tag];
        }
        finalStudents.push({ ...student, tags });
      });

      return {
        ...state,
        studentData: {
          ...state.studentData,
          data: finalStudents,
        },
      };
    case INPUT_VALUE_CHANGE:
      return {
        ...state,
        [action.payload.type]: {
          ...state[action.payload.type],
          value: action.payload.value,
        },
      };
    case INPUT_BLUR_CHANGE:
      return {
        ...state,
        [action.payload.type]: {
          ...state[action.payload.type],
          isTouched: true,
        },
      };
    case RESET_INPUT:
      return {
        ...state,
        [action.payload.type]: {
          value: "",
          isTouched: false,
        },
      };
    default:
      return state;
  }
};

export const AppContextProvider = (props) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
};
