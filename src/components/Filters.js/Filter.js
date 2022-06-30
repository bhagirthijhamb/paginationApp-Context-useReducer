import classes from "./Filter.module.css";
import useInput from "./../../hooks/useInput";

const Filter = (props) => {
  const {
    value,
    hasError,
    enteredValueChangeHandler,
    inputBlurHandler,
    reset,
  } = useInput(`${props.inputType}Filter`, (val) => val.trim().length !== 0);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    reset();
  };

  const clickClearFilterBtnHandler = () => {
    reset();
  };

  return (
    <div className={classes.filterContainer}>
      <form onSubmit={formSubmitHandler}>
        <input
          type="text"
          placeholder={props.placeholder}
          onChange={enteredValueChangeHandler}
          onBlur={inputBlurHandler}
          value={value}
        />
        {hasError && (
          <p className={classes.errorText}>
            Please enter a valid {props.inputType} value.
          </p>
        )}
      </form>
      <button onClick={clickClearFilterBtnHandler}>
        Clear {props.inputType} Filter
      </button>
    </div>
  );
};

export default Filter;
