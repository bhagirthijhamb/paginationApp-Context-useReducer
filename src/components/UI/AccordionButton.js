import classes from "./AccordionButton.module.css";

const AccordionButton = (props) => {
  return (
    <div className={classes.accordionButton}>
      <button onClick={props.accordionButtonClickHandler}>
        {props.isActive ? "-" : "+"}
      </button>
    </div>
  );
};

export default AccordionButton;
