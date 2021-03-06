import { useState, useContext } from "react";
import { AppContext } from "../../context/appContext";

import classes from "./TagInput.module.css";
import { ADD_TAG } from "./../../context/types";

const Tags = (props) => {
  const [tag, setTag] = useState("");
  const [error, setError] = useState(false);
  const { dispatch, addTag } = useContext(AppContext);

  const tagValueChangeHandler = (e) => {
    setTag(e.target.value);
    if (e.target.value) {
      setError(false);
    }
  };

  const addTagHandler = (e) => {
    e.preventDefault();
    if (tag.trim() === "") {
      setError(true);
      setTag("");
      return;
    }
    // dispatch({ type: ADD_TAG, payload: { tag, id: props.studentId } });
    addTag(props.studentId, tag);
    setTag("");
  };

  return (
    <form data-testid="form" onSubmit={addTagHandler}>
      <input
        type="text"
        placeholder="Add a tag"
        onChange={tagValueChangeHandler}
        value={tag}
        required
        id="text1"
      />
      {error && (
        <p className={classes.errorText}>
          Please enter a valid {props.stateVariable} value.
        </p>
      )}
    </form>
  );
};

export default Tags;
