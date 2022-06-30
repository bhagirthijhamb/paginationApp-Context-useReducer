import { useCallback, useContext } from "react";
import { AppContext } from "./../context/appContext";
import { SEND, SUCCESS, ERROR } from "./../context/types";

const useHttp = (requestFunction, startWithPending = false) => {
  const { state, dispatch } = useContext(AppContext);

  const sendRequest = useCallback(
    async function (requestData) {
      dispatch({ type: SEND, startingStatus: startWithPending });
      try {
        const responseData = await requestFunction(requestData);
        dispatch({ type: SUCCESS, responseData });
      } catch (error) {
        dispatch({
          type: ERROR,
          errorMessage: error.message || "Something went wrong!",
        });
      }
    },
    [requestFunction, dispatch, startWithPending]
  );

  return { sendRequest, ...state };
};

export default useHttp;
