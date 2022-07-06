import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Student from "./Student";
import StudentList from "./StudentList";
import { AppContext } from "./../../context/appContext";

describe("Student component", () => {
  afterEach(cleanup);
  test("renders the accordion details when the accordion button is clicked", () => {
    const state = {
      studentData: {
        data: [
          {
            id: 1,
            name: "Leanne Graham",
            email: "Sincere@april.biz",
            company: "Romaguera-Crona",
            phone: "1-770-736-8031 x56442",
            geo: {
              lat: "-37.3159",
              lng: "81.1496",
            },
            tags: [],
          },
        ],
        error: null,
        status: null,
      },
      nameFilter: { value: "", isTouched: false },
      tagFilter: { value: "", isTouched: false },
    };
    const { container, getByText } = render(
      <AppContext.Provider value={{ state: state, dispatch: () => {} }}>
        <Student
          studentDetails={{
            id: 1,
            name: "Leanne Graham",
            email: "Sincere@april.biz",
            company: "Romaguera-Crona",
            phone: "1-770-736-8031 x56442",
            geo: {
              lat: "-37.3159",
              lng: "81.1496",
            },
            tags: [],
          }}
        />
      </AppContext.Provider>
    );

    // const accordionBtnElement = screen.getByRole("button");
    const accordionBtnElement = screen.getByText("+");
    // userEvent.click(accordionBtnElement);
    fireEvent.click(accordionBtnElement);
    const outputElement = container.getElementsByClassName("geoDetails");
    expect(outputElement.length).toBe(1);
  });
});
