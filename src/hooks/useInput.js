import { useContext } from "react";
import { AppContext } from "./../context/appContext";
import {
  INPUT_VALUE_CHANGE,
  INPUT_BLUR_CHANGE,
  RESET_INPUT,
} from "../context/types";

const useInput = (valueType, validateValue) => {
  const { state, dispatch } = useContext(AppContext);
  // console.log("state", state);
  const enteredValue = state[valueType].value;
  const isTouched = state[valueType].isTouched;

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const enteredValueChangeHandler = (event) => {
    dispatch({
      type: INPUT_VALUE_CHANGE,
      payload: { type: valueType, value: event.target.value },
    });
  };

  const inputBlurHandler = (event) => {
    dispatch({
      type: INPUT_BLUR_CHANGE,
      payload: { type: valueType },
    });
  };

  const reset = () => {
    dispatch({ type: RESET_INPUT, payload: { type: valueType } });
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    enteredValueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
