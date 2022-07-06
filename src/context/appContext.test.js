import React, { useReducer } from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import * as TYPES from "./types";
import { appReducer, initialState } from "./appContext";

afterEach(cleanup);

describe("test the reducer and actions", () => {
  it("should set the status to pending", () => {
    expect(
      appReducer(initialState, { type: TYPES.SEND, startingStatus: true })
    ).toEqual({
      ...initialState,
      studentData: {
        ...initialState.studentData,
        status: "pending",
      },
    });
  });

  it("should set the status to SUCCESS", () => {
    const students = [
      {
        company: "Romaguera-Crona",
        email: "Sincere@april.biz",
        geo: {
          lat: "-37.3159",
          lng: "81.1496",
        },
        id: 1,
        name: "Leanne Graham",
        phone: "1-770-736-8031 x56442",
        tags: [],
      },
      {
        company: "Deckow-Crist",
        email: "Shanna@melissa.tv",
        geo: {
          lat: "-43.9509",
          lng: "-34.4618",
        },
        id: 2,
        name: "Ervin Howell",
        phone: "010-692-6593 x09125",
        tags: [],
      },
    ];
    expect(
      appReducer(initialState, { type: TYPES.SUCCESS, responseData: students })
    ).toEqual({
      ...initialState,
      studentData: {
        ...initialState.studentData,
        status: "completed",
        data: students,
      },
    });
  });

  it("should set the tag for a student", () => {
    const students = [
      {
        company: "Romaguera-Crona",
        email: "Sincere@april.biz",
        geo: {
          lat: "-37.3159",
          lng: "81.1496",
        },
        id: 1,
        name: "Leanne Graham",
        phone: "1-770-736-8031 x56442",
        tags: ["tag1"],
      },
    ];
    expect(
      appReducer(initialState, {
        type: TYPES.ADD_TAG,
        payload: { studentData: students },
      })
    ).toEqual({
      ...initialState,
      studentData: {
        ...initialState.studentData,
        data: students,
      },
    });
  });
});
