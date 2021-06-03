import React from "react";
import { render } from "@testing-library/react";
import Greetings from "./pages/Greetings";

const itif = (condition) => (condition ? it : it.skip);

let runTestCondition = Greetings.prototype instanceof React.Component;
it("Greetings компонент должен наследовать React.Component", () => {
  expect(Greetings.prototype instanceof React.Component).toBeTruthy();
});

itif(runTestCondition)(
  "Корректно отрисовывает страницу Greetings c именtv в параметрах",
  () => {
    const match = {
      params: {
        name: "TEST",
      },
    };
    const page = render(<Greetings match={match} />);
    expect(page.container).toBeInTheDocument();
    const name = page.getByText(/TEST/);
    expect(name).toBeInTheDocument();
  }
);
