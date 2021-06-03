import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import App from "./App";
import ProductsList from "./components/ProductsList";

const itif = (condition) => (condition ? it : it.skip);

const MOCK_PRODUCTS = {
  data: [
    {
      title: "Ahmad Tea Strawberry Cream черный чай в пакетиках",
      price: 69,
      id: "6086b0fc9fe3f900157310ce",
    },
    {
      title: "Целебные силы Кавказа",
      price: 268,
      id: "6086b0fc9fe3f900157310cf",
    },
    {
      title: "Чашка кофейная QWERTY",
      price: 549,
      id: "6086b0fc9fe3f900157310d2",
    },
    {
      title: "Ahmad Tea Blueberry Breeze зеленый чай в пакетиках",
      price: 68,
      id: "6086b0fc9fe3f900157310d1",
    },
    {
      title: "Ситечко для заварки",
      price: 191,
      id: "6086b0fc9fe3f900157310d4",
    },
  ],
  message: "success",
};

const DELAY = 200;

let initialFetch;
const mockFetch = (data, error) => {
  if (!initialFetch) {
    initialFetch = global.fetch;
  }

  global.fetch = jest.fn(
    () =>
      new Promise((res, rej) => {
        setTimeout(() => {
          if (data) {
            return res({
              json: () =>
                new Promise((r) => {
                  r(data);
                }),
            });
          }

          return rej(error);
        }, DELAY);
      })
  );
};

const restoreFetch = () => {
  if (initialFetch) {
    global.fetch = initialFetch;
  }
};
const delayed = (fn, done) => {
  setTimeout(() => {
    try {
      fn();
      done();
    } catch (err) {
      done(err);
    }
  }, DELAY + 10);
};

const findProductRowByTitle = (title) => {
  const titleEl = screen.getByText(title);
  const productRowEl = titleEl.parentElement;
  const productRow = within(productRowEl);
  return { productRow, productRowEl };
};

let runTestCondition = ProductsList.prototype instanceof React.Component;
it("ProductsList компонент должен наследовать React.Component", () => {
  expect(ProductsList.prototype instanceof React.Component).toBeTruthy();
});

itif(runTestCondition)("Корректно отрисовывает компонент App", () => {
  render(<App />);
  const title = screen.getByTestId("page-title");
  expect(title).toBeInTheDocument();
  expect(title.innerHTML).toBe("Список товаров");
});

itif(runTestCondition)(
  "Загружает данные при первом рендере компонента, вместе с элементом лоадера",
  (done) => {
    mockFetch(MOCK_PRODUCTS);
    render(<App />);
    const loaderEl = screen.getByTestId("loading-message");
    expect(loaderEl).toBeInTheDocument();

    delayed(() => {
      for (let product of MOCK_PRODUCTS.data) {
        const titleEl = screen.getByText(product.title);
        expect(titleEl).toBeInTheDocument();
      }

      expect(global.fetch).toHaveBeenCalledWith(
        "https://bootcamp-tea-app.herokuapp.com/products"
      );
    }, done);
  }
);

itif(runTestCondition)(
  "Для каждого продукта, отрисовывает его название, цену и кнопку удаления",
  (done) => {
    mockFetch(MOCK_PRODUCTS);
    render(<App />);
    const loaderEl = screen.getByTestId("loading-message");
    expect(loaderEl).toBeInTheDocument();

    delayed(() => {
      for (let product of MOCK_PRODUCTS.data) {
        const { productRow, productRowEl } = findProductRowByTitle(
          product.title
        );

        const priceEl = productRow.getByText(product.price);
        const titleEl = productRow.getByText(product.title);
        const deletBtn = productRowEl.querySelector("button");

        expect(titleEl).toBeInTheDocument();
        expect(priceEl).toBeInTheDocument();
        expect(deletBtn).toBeInTheDocument();
      }
    }, done);
  }
);

itif(runTestCondition)("Показывает сообщение об ошибке", (done) => {
  mockFetch(null, new Error("MOCK ERROR"));
  render(<App />);
  const loaderEl = screen.getByTestId("loading-message");
  expect(loaderEl).toBeInTheDocument();

  delayed(() => {
    const errEl = screen.getByTestId("error-message");
    expect(errEl).toBeInTheDocument();
  }, done);
});

itif(runTestCondition)(
  "Отрисовывает форму добавления нового товара",
  (done) => {
    mockFetch(MOCK_PRODUCTS);
    render(<App />);
    const loaderEl = screen.getByTestId("loading-message");
    expect(loaderEl).toBeInTheDocument();

    delayed(() => {
      const titleInput = screen.getByTestId("input-title");
      const priceInput = screen.getByTestId("input-price");
      const addProductBtn = screen.getByTestId("button-add-product");

      expect(titleInput).toBeInTheDocument();
      expect(priceInput).toBeInTheDocument();
      expect(addProductBtn).toBeInTheDocument();
    }, done);
  }
);

itif(runTestCondition)(
  "При событии ввода в инпут названия товара, значение инпута меняется",
  (done) => {
    mockFetch(MOCK_PRODUCTS);
    render(<App />);
    const loaderEl = screen.getByTestId("loading-message");
    expect(loaderEl).toBeInTheDocument();

    delayed(() => {
      const titleInput = screen.getByTestId("input-title");

      expect(titleInput).toBeInTheDocument();
      expect(titleInput.value).toBe("");

      fireEvent.change(titleInput, { target: { value: "a" } });
      expect(titleInput.value).toBe("a");
    }, done);
  }
);

itif(runTestCondition)(
  "При событии ввода в инпут цены товара нечислового значения, значение инпута не меняется",
  (done) => {
    mockFetch(MOCK_PRODUCTS);
    render(<App />);
    const loaderEl = screen.getByTestId("loading-message");
    expect(loaderEl).toBeInTheDocument();

    delayed(() => {
      const priceInput = screen.getByTestId("input-price");

      expect(priceInput).toBeInTheDocument();
      expect(priceInput.value).toBe("");

      fireEvent.change(priceInput, { target: { value: "a" } });
      expect(priceInput.value).toBe("");

      fireEvent.change(priceInput, { target: { value: "2" } });
      expect(priceInput.value).toBe("2");
    }, done);
  }
);

itif(runTestCondition)(
  "Кнопка создания товара не активна, если значения названия или цены не введены",
  (done) => {
    mockFetch(MOCK_PRODUCTS);
    render(<App />);
    const loaderEl = screen.getByTestId("loading-message");
    expect(loaderEl).toBeInTheDocument();

    delayed(() => {
      const titleInput = screen.getByTestId("input-title");
      const priceInput = screen.getByTestId("input-price");
      const addProductBtn = screen.getByTestId("button-add-product");

      expect(addProductBtn.disabled).toBeTruthy();

      fireEvent.change(priceInput, { target: { value: "2" } });
      expect(priceInput.value).toBe("2");
      expect(addProductBtn.disabled).toBeTruthy();

      fireEvent.change(titleInput, { target: { value: "test" } });
      expect(addProductBtn.disabled).toBeFalsy();
    }, done);
  }
);

itif(runTestCondition)(
  "При нажатии на кнопку добавления товара, новый товар добавляется в список товаров",
  (done) => {
    mockFetch(MOCK_PRODUCTS);
    render(<App />);
    const loaderEl = screen.getByTestId("loading-message");
    expect(loaderEl).toBeInTheDocument();

    const title = "TEST" + Math.random();
    const price = "200";

    const checkIfNewProductWasAdded = (err) =>
      delayed(() => {
        if (err) {
          throw err;
        }
        const { productRow, productRowEl } = findProductRowByTitle(title);
        const priceEl = productRow.getByText(price);
        const titleEl = productRow.getByText(title);
        const deletBtn = productRowEl.querySelector("button");

        expect(titleEl).toBeInTheDocument();
        expect(priceEl).toBeInTheDocument();
        expect(deletBtn).toBeInTheDocument();

        expect(titleEl.innerHTML).toBe(title);
        expect(priceEl.innerHTML).toBe(price);

        expect(global.fetch).toHaveBeenCalledWith(
          "https://bootcamp-tea-app.herokuapp.com/product",
          {
            body: JSON.stringify({ title, price: parseInt(price) }),
            headers: { "content-type": "application/json" },
            method: "POST",
          }
        );
      }, done);

    delayed(() => {
      mockFetch({
        data: {
          id: title,
          title,
          price,
        },
      });

      const titleInput = screen.getByTestId("input-title");
      const priceInput = screen.getByTestId("input-price");
      const addProductBtn = screen.getByTestId("button-add-product");

      fireEvent.change(titleInput, { target: { value: title } });
      expect(titleInput.value).toBe(title);

      fireEvent.change(priceInput, { target: { value: price } });
      expect(priceInput.value).toBe(price);

      addProductBtn.click();
    }, checkIfNewProductWasAdded);
  }
);

itif(runTestCondition)(
  "При нажатии на кнопку удаления товара, товар удаляется из списока товаров",
  (done) => {
    mockFetch(MOCK_PRODUCTS);
    render(<App />);
    const loaderEl = screen.getByTestId("loading-message");
    expect(loaderEl).toBeInTheDocument();

    const title = "TEST" + Math.random();
    const price = "200";

    const checkIfNewProductWasRemoved = (err) => {
      delayed(() => {
        if (err) {
          throw err;
        }

        let productWasRemoved = null;
        try {
          findProductRowByTitle(title);
        } catch (err) {
          productWasRemoved = !!err;
        }

        expect(productWasRemoved).toBeTruthy();
        expect(global.fetch).toHaveBeenCalledWith(
          "https://bootcamp-tea-app.herokuapp.com/product",
          {
            body: JSON.stringify({ id: title }),
            headers: { "content-type": "application/json" },
            method: "DELETE",
          }
        );
      }, done);
    };

    const checkIfNewProductWasAdded = (err) =>
      delayed(() => {
        if (err) {
          throw err;
        }

        const { productRow, productRowEl } = findProductRowByTitle(title);
        const priceEl = productRow.getByText(price);
        const titleEl = productRow.getByText(title);
        const deletBtn = productRowEl.querySelector("button");

        expect(titleEl).toBeInTheDocument();
        expect(priceEl).toBeInTheDocument();
        expect(deletBtn).toBeInTheDocument();

        expect(titleEl.innerHTML).toBe(title);
        expect(priceEl.innerHTML).toBe(price);

        expect(global.fetch).toHaveBeenCalledWith(
          "https://bootcamp-tea-app.herokuapp.com/product",
          {
            body: JSON.stringify({ title, price: parseInt(price) }),
            headers: { "content-type": "application/json" },
            method: "POST",
          }
        );

        mockFetch({});
        deletBtn.click();
      }, checkIfNewProductWasRemoved);

    delayed(() => {
      mockFetch({
        data: {
          id: title,
          title,
          price,
        },
      });

      const titleInput = screen.getByTestId("input-title");
      const priceInput = screen.getByTestId("input-price");
      const addProductBtn = screen.getByTestId("button-add-product");

      fireEvent.change(titleInput, { target: { value: title } });
      expect(titleInput.value).toBe(title);

      fireEvent.change(priceInput, { target: { value: price } });
      expect(priceInput.value).toBe(price);

      addProductBtn.click();
    }, checkIfNewProductWasAdded);
  }
);
