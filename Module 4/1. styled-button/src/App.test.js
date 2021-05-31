import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import StyledButton from './components/StyledButton';

const itif = (condition) => condition ? it : it.skip;

let runTestCondition = !!StyledButton.styledComponentId
it('StyledButton компонент должен быть создан используя styled-components', () => {
  expect(runTestCondition).toBeTruthy();
});

itif(runTestCondition)('Корректно отрисовывает компонент App', () => {
  render(<App />);
  const title = screen.getByTestId('page-title');
  expect(title).toBeInTheDocument();
  expect(title.innerHTML).toBe('Стильная кнопка');
});

itif(runTestCondition)('Компонент должен быть кнопкой', () => {
  render(<App />);
  const btn = screen.getByText('Стильная кнопка!')
  expect(btn).toBeInTheDocument();
  expect(btn.tagName).toBe('BUTTON');
});

itif(runTestCondition)('Кнопка должна иметь заданные стили в изначальном состоянии', () => {
  render(<App />);
  const btn = screen.getByText('Стильная кнопка!')
  const elements = document.getElementsByClassName(btn.className)
  const styles = window.getComputedStyle(elements[0]);

  expect(styles.minWidth).toBe('200px');
  expect(styles.height).toBe('60px');
  expect(styles.borderRadius).toBe('6px');
  expect(styles.borderWidth).toBe('0px');
  expect(styles.backgroundColor).toBe('red');
  expect(styles.color).toBe('white');
});

itif(runTestCondition)('Кнопка должна иметь заданные стили при налиичии пропса "dark"=true', () => {
  render(<App dark />);
  const btn = screen.getByText('Стильная кнопка!')
  const elements = document.getElementsByClassName(btn.className)
  const styles = window.getComputedStyle(elements[0]);

  expect(styles.minWidth).toBe('200px');
  expect(styles.height).toBe('60px');
  expect(styles.borderRadius).toBe('6px');
  expect(styles.borderWidth).toBe('0px');
  expect(styles.backgroundColor).toBe('lightblue');
  expect(styles.color).toBe('black');
});

