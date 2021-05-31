import React from 'react';
import { render, screen, within } from '@testing-library/react';
import App, { PRODUCTS } from './App';
import ProductsList from './components/ProductsList';

const itif = (condition) => condition ? it : it.skip;

let runTestCondition = ProductsList.prototype instanceof React.Component
it('ProductsList компонент должен наследовать React.Component', () => {
  expect(ProductsList.prototype instanceof React.Component).toBeTruthy();
});

itif(runTestCondition)('Корректно отрисовывает компонент App', () => {
  render(<App />);
  const title = screen.getByTestId('page-title');
  expect(title).toBeInTheDocument();
  expect(title.innerHTML).toBe('Список товаров');
});

itif(runTestCondition)('Содержит элемент с data-testid равным "basket-items-count"', () => {
  render(<App />);
  const basketCountEl = screen.getByTestId('basket-items-count')
  expect(basketCountEl).toBeInTheDocument();
});

itif(runTestCondition)('Изначальное количество продуктов в корзине равно нулю или не показывается', () => {
  render(<App />);
  const basketCountEl = screen.getByTestId('basket-items-count')
  expect(parseInt(basketCountEl.innerHTML)).toBeFalsy();
});

itif(runTestCondition)('Отрисовывает список товаров, каждый из которых имеет data-testid="product"', () => {
  render(<App />);
  const products = screen.getAllByTestId('product')
  expect(products.length).toBe(PRODUCTS.length)
});

itif(runTestCondition)('Отрисовывает список товаров в правильном порядке', () => {
  render(<App />);
  const products = screen.getAllByTestId('product')
  for (let i = 0; i < products.length; i++) {
    const productEl = within(products[i]);
    const productName = productEl.getByText(PRODUCTS[i].name);

    expect(productName).toBeInTheDocument()
  }
});

itif(runTestCondition)('У каждого продукта есть кнопка добавления в корзину', () => {
  render(<App />);
  const products = screen.getAllByTestId('product')
  for (let i = 0; i < products.length; i++) {
    const productEl = products[i];
    const addToBasketBtn = productEl.querySelector('button');

    expect(addToBasketBtn).toBeInTheDocument()
  }
});

itif(runTestCondition)('Кнопка добавления в корзину должна быть disabled для товаров, которых нет в наличии', () => {
  render(<App />);
  const products = screen.getAllByTestId('product')
  for (let i = 0; i < products.length; i++) {
    const productEl = products[i];
    const addToBasketBtn = productEl.querySelector('button');

    expect(addToBasketBtn).toBeInTheDocument()
    expect(addToBasketBtn.disabled).toBe(!PRODUCTS[i].available)
  }
});

itif(runTestCondition)('При нажатии на кнопку добавления товара, счетчик кол-ва товаров в корзине увеличивается', () => {
  render(<App />);
  const products = screen.getAllByTestId('product')
  const basketCountEl = screen.getByTestId('basket-items-count')
  let counter = 0;

  for (let i = 0; i < products.length; i++) {
    const productEl = products[i];
    const addToBasketBtn = productEl.querySelector('button');

    addToBasketBtn.click()
    if (PRODUCTS[i].available) {
      counter += 1
    }
    expect(parseInt(basketCountEl.innerHTML)).toBe(counter)
  }
});