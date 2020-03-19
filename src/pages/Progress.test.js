import React from "react";
import { render } from "@testing-library/react";
import Progress from "./Progress";

test("renders learn react link", () => {
  const { getByText } = render(<Progress />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test("sum(2, 2) 不等于 5", () => {
  expect(2 + 2).toBe(4);
});

// test("handle Change Progress Val 25 + 25 === 50", () => {
//   const startState = {
//     progressBars: { progress1: 25, progress2: 50, progress3: 75 },
//     limit: 100,
//     targetBar: "progress1"
//   };

//   const finState = Progress.handleChangeProgressVal(startState, 25);

//   expect(finState.progressBars).toEqual({
//     progress1: 50,
//     progress2: 50,
//     progress3: 75
//   });
// });
