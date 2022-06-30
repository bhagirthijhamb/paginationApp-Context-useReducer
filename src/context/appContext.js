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
      console.log("action", action);
      // const updatedStudents = [];
      const updatedTags = [];
      state.studentData.data.forEach((student) => {
        if (student.id === action.payload.id) {
          // updatedTags.push(action.payload.tag);
          // student.tags = student.tags.concat(updatedTags);
          student.tags = student.tags.concat(action.payload.tag);
          console.log("student.tags", student.tags);
        }
        console.log("student.tags", student.tags);
        // updatedStudents.push(student);
      });
      return {
        ...state,
        // studentData: {
        //   ...state.studentData,
        //   data: updatedStudents,
        // },
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
