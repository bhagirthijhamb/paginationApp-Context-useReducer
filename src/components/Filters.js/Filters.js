import Filter from "./Filter";
import { NAME, TAG } from "../../context/types";

const Filters = () => {
  return (
    <>
      <Filter placeholder="Search by name" inputType={NAME} />
      <Filter placeholder="Search by tag" inputType={TAG} />
    </>
  );
};

export default Filters;
