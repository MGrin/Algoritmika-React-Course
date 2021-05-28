import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import RandomDice from './components/RandomDices';

const itif = (condition) => condition ? it : it.skip;

let runTestCondition = RandomDice.prototype instanceof React.Component
it('RandomDice компонент должен наследовать React.Component', () => {
  expect(RandomDice.prototype instanceof React.Component).toBeTruthy();
});

itif(runTestCondition)('Корректно отрисовывает компонент App', () => {
  render(<App />);
  const title = screen.getByTestId('page-title');
  expect(title).toBeInTheDocument();
  expect(title.innerHTML).toBe('Игральные кости');
});

itif(runTestCondition)('Содержит элемент с data-testid равным "dices-count"', () => {
  render(<App />);
  const dicesCountEl = screen.getByTestId('dices-count');
  expect(dicesCountEl).toBeInTheDocument();
});

itif(runTestCondition)('Изначально кол-во игральных костей равно 1', () => {
  render(<App />);
  const dicesCountEl = screen.getByTestId('dices-count');
  expect(dicesCountEl.innerHTML).toBe("1");
});

itif(runTestCondition)('Содержит элемент с data-testid равным "throw-value"', () => {
  render(<App />);
  const throwedValue = screen.getByTestId('throw-value');
  expect(throwedValue).toBeInTheDocument();
});

itif(runTestCondition)('Изначально значение "throw-value" путсое на экране', () => {
  render(<App />);
  const throwedValueEl = screen.getByTestId('throw-value');
  expect(throwedValueEl.innerHTML).toBeFalsy();
});

itif(runTestCondition)('Содержит кнопку добавления игральной кости с data-testid равным "add-dice"', () => {
  render(<App />);
  const addDiceBtn = screen.getByTestId('add-dice');
  expect(addDiceBtn).toBeInTheDocument();
  expect(addDiceBtn.tagName).toBe('BUTTON');
});

itif(runTestCondition)('Содержит кнопку удаления игральной кости с data-testid равным "remove-dice"', () => {
  render(<App />);
  const removeDiceBtn = screen.getByTestId('remove-dice');
  expect(removeDiceBtn).toBeInTheDocument();
  expect(removeDiceBtn.tagName).toBe('BUTTON');
});

itif(runTestCondition)('Содержит кнопку броска всех костей с data-testid равным "throw-dices"', () => {
  render(<App />);
  const throwDicesBtn = screen.getByTestId('throw-dices');
  expect(throwDicesBtn).toBeInTheDocument();
  expect(throwDicesBtn.tagName).toBe('BUTTON');
});

itif(runTestCondition)('При нажатии на кнопку добавления игральной кости меняется показаное кол-во костей на экране', () => {
  render(<App />);
  const addDiceBtn = screen.getByTestId('add-dice');
  const dicesCountEl = screen.getByTestId('dices-count');

  expect(dicesCountEl.innerHTML).toBe('1');

  addDiceBtn.click();
  expect(dicesCountEl.innerHTML).toBe('2');

  addDiceBtn.click();
  expect(dicesCountEl.innerHTML).toBe('3');
});

itif(runTestCondition)('При нажатии на кнопку удаления игральной кости меняется показаное кол-во костей на экране', () => {
  render(<App />);
  const addDiceBtn = screen.getByTestId('add-dice');
  const removeDiceBtn = screen.getByTestId('remove-dice');
  const dicesCountEl = screen.getByTestId('dices-count');

  addDiceBtn.click();  
  addDiceBtn.click();
  expect(dicesCountEl.innerHTML).toBe('3');

  removeDiceBtn.click();
  expect(dicesCountEl.innerHTML).toBe('2');

  removeDiceBtn.click();
  expect(dicesCountEl.innerHTML).toBe('1');
});

itif(runTestCondition)('Значение кол-ва игральных костей не выходят за рамки 1 - 20', () => {
  render(<App />);
  const addDiceBtn = screen.getByTestId('add-dice');
  const removeDiceBtn = screen.getByTestId('remove-dice');
  const dicesCountEl = screen.getByTestId('dices-count');

  expect(dicesCountEl.innerHTML).toBe('1');

  removeDiceBtn.click();
  expect(dicesCountEl.innerHTML).toBe('1');

  removeDiceBtn.click();
  removeDiceBtn.click();
  removeDiceBtn.click();
  expect(dicesCountEl.innerHTML).toBe('1');

  for (let i = 0; i < 18; i++) {
    addDiceBtn.click();
  }
  expect(dicesCountEl.innerHTML).toBe('19');

  addDiceBtn.click();
  expect(dicesCountEl.innerHTML).toBe('20');

  addDiceBtn.click();
  expect(dicesCountEl.innerHTML).toBe('20');

  addDiceBtn.click();
  addDiceBtn.click();
  addDiceBtn.click();
  expect(dicesCountEl.innerHTML).toBe('20');
});

const mockMath = () => {
  const initial = Object.create(global.Math);
  const mock = Object.create(initial);
  mock.random = jest.fn(() => 0.3);
  global.Math = mock;
  return { mock, initial }
};

const unmockMath = (initial) => {
  global.Math = initial
}

itif(runTestCondition)('При нажатии на кнопку кидания костей, функция Math.random() вызывается ровно столько раз, сколько есть игральных костей', () => {
  const { mock, initial } = mockMath();
  render(<App />);
  const throwDicesBtn = screen.getByTestId('throw-dices');
  const dicesCountEl = screen.getByTestId('dices-count');
  const addDiceBtn = screen.getByTestId('add-dice');

  const testNumberOfRandmoCalls = () => {
    let clickCounter = 0;
    mock.random.mockClear();

    throwDicesBtn.click()
    clickCounter += 1
    expect(mock.random).toHaveBeenCalledTimes(parseInt(dicesCountEl.innerHTML) * clickCounter)

    throwDicesBtn.click()
    clickCounter += 1
    expect(mock.random).toHaveBeenCalledTimes(parseInt(dicesCountEl.innerHTML) * clickCounter)

    throwDicesBtn.click()
    throwDicesBtn.click()
    clickCounter += 2
    expect(mock.random).toHaveBeenCalledTimes(parseInt(dicesCountEl.innerHTML) * clickCounter)
  }

  testNumberOfRandmoCalls()

  addDiceBtn.click()
  testNumberOfRandmoCalls()
  
  unmockMath(initial);
});

itif(runTestCondition)('При нажатии на кнопку кидания костей, внутри элемента с data-testid равным throw-value показывается сумма значений выброшенных на всех костях', () => {
  const { mock, initial } = mockMath();
  render(<App />);
  const throwDicesBtn = screen.getByTestId('throw-dices');
  const addDiceBtn = screen.getByTestId('add-dice');
  const throwedValueEl = screen.getByTestId('throw-value');
  expect(throwedValueEl.innerHTML).toBeFalsy();

  throwDicesBtn.click();
  expect(throwedValueEl.innerHTML).toBe('2');

  addDiceBtn.click();
  throwDicesBtn.click();
  expect(throwedValueEl.innerHTML).toBe('4');

  unmockMath(initial);
});

itif(runTestCondition)('При добавлении или удалении игральной кости, элемент с data-testid равным "throw-value" очищается', () => {
  const { mock, initial } = mockMath();
  render(<App />);
  const throwDicesBtn = screen.getByTestId('throw-dices');
  const addDiceBtn = screen.getByTestId('add-dice');
  const throwedValueEl = screen.getByTestId('throw-value');
  expect(throwedValueEl.innerHTML).toBeFalsy();

  throwDicesBtn.click();
  expect(throwedValueEl.innerHTML).toBe('2');

  addDiceBtn.click();
  expect(throwedValueEl.innerHTML).toBeFalsy();

  throwDicesBtn.click();
  expect(throwedValueEl.innerHTML).toBe('4');

  unmockMath(initial);
});