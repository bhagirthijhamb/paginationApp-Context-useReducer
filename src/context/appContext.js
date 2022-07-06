import { useReducer, createContext } from "react";

import {
  SEND,
  SUCCESS,
  ERROR,
  ADD_TAG,
  INPUT_VALUE_CHANGE,
  INPUT_BLUR_CHANGE,
  RESET_INPUT,
} from "./types";

// export const AppContext = createContext({
//   studentData: {
//     data: [],
//     error: null,
//     status: null,
//   },
//   nameFilter: { value: "", isTouched: false },
//   tagFilter: { value: "", isTouched: false },
//   addTag: () => {},
// });

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
    case ERROR:
      console.log("action", action);
      return {
        ...state,
        studentData: {
          ...state.studentData,
          error: action.errorMessage,
          status: "completed",
        },
      };
    case ADD_TAG:
      // const sampleStudents = [...state.studentData.data];
      // let finalStudents = [];
      // sampleStudents.forEach((student) => {
      //   let tags = [...student.tags];
      //   if (student.id === action.payload.id) {
      //     tags = [...student.tags, action.payload.tag];
      //   }
      //   finalStudents.push({ ...student, tags });
      // });

      return {
        ...state,
        studentData: {
          ...state.studentData,
          // data: finalStudents,
          data: action.payload.studentData,
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

  const addTagHandler = (id, tag) => {
    console.log("id", id);
    console.log("tag", tag);
    const sampleStudents = [...state.studentData.data];
    let finalStudents = [];
    sampleStudents.forEach((student) => {
      let tags = [...student.tags];
      if (student.id === id) {
        tags = [...student.tags, tag];
      }
      finalStudents.push({ ...student, tags });
    });
    dispatch({ type: ADD_TAG, payload: { studentData: finalStudents } });
  };

  const contextValue = {
    state,
    dispatch,
    addTag: addTagHandler,
  };

  return (
    // <AppContext.Provider value={{ state, dispatch }}>
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};
