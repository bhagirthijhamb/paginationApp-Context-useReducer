import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StudentList from "./StudentList";
import { AppContext } from "./../../context/appContext";

describe("StudentList component", () => {
  test("renders students if request succeeds", () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [
        {
          id: 1,
          name: "Leanne Graham",
          username: "Bret",
          email: "Sincere@april.biz",
          address: {
            street: "Kulas Light",
            suite: "Apt. 556",
            city: "Gwenborough",
            zipcode: "92998-3874",
            geo: {
              lat: "-37.3159",
              lng: "81.1496",
            },
          },
          phone: "1-770-736-8031 x56442",
          website: "hildegard.org",
          company: {
            name: "Romaguera-Crona",
            catchPhrase: "Multi-layered client-server neural-net",
            bs: "harness real-time e-markets",
          },
        },
      ],
    });
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
    render(
      <AppContext.Provider value={{ state: state, dispatch: () => {} }}>
        <StudentList />
      </AppContext.Provider>
    );

    const listItemElement = screen.getAllByRole("listitem");
    expect(listItemElement).not.toHaveLength(0);

    // const outputElement = container.getElementsByClassName("geoDetails");
    // expect(outputElement).toBeInTheDocument();

    // const outputElement = container.getElementsByRole("listitem");
    // const outputElement = screen.getElementByClassName("geoDetails");
    // expect(outputElement).toBeInTheDocument();
  });
});
