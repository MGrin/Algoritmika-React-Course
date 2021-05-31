import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import CodeInput from './components/CodeInput';

const itif = (condition) => condition ? it : it.skip;

let runTestCondition = CodeInput.prototype instanceof React.Component
it('CodeInput компонент должен наследовать React.Component', () => {
  expect(CodeInput.prototype instanceof React.Component).toBeTruthy();
});

itif(runTestCondition)('Корректно отрисовывает компонент App', () => {
  render(<App />);
  const title = screen.getByTestId('page-title');
  expect(title).toBeInTheDocument();
  expect(title.innerHTML).toBe('Код');
});

itif(runTestCondition)('Корректно отрисовывает компонент CodeInput без пропсов', () => {
  const el = render(<CodeInput />);
  expect(el.container).toBeInTheDocument();
});

itif(runTestCondition)('CodeInput элемент содержит кол-во инпутов, равное пропсу length', () => {
  const el = render(<CodeInput length={8} />);
  const inputs = el.container.querySelectorAll('input')
  expect(inputs).toHaveLength(8)
});

itif(runTestCondition)('Input элементы изначально пустые', () => {
  const el = render(<CodeInput length={8} />);
  const inputs = el.container.querySelectorAll('input')
  for (let input of inputs) {
    expect(input.value).toBe('')
  }
});

itif(runTestCondition)('Input элементы принимают значения из defaultValue пропса', () => {
  const length = 8;
  const defaultValue = "1234";

  const el = render(<CodeInput length={length} defaultValue={defaultValue} />);

  const inputs = el.container.querySelectorAll('input')
  for (let i = 0; i < 8; i++) {
    if (i < defaultValue.length) {
      expect(inputs[i].value).toBe(defaultValue[i])
    } else {
      expect(inputs[i].value).toBe('')
    }
  }
});

itif(runTestCondition)('Коспонент вызывает onChange только после полного заполнения всех инпутов', () => {
  const length = 8;
  const onChange = jest.fn();

  const el = render(<CodeInput length={length} onChange={onChange} />);

  const inputs = el.container.querySelectorAll('input')
  for (let input of inputs) {
    fireEvent.change(input, { target: { value: 1 } })
  }

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith('11111111');
});

itif(runTestCondition)('Коспонент не вызывает onChange если его значение не передано', () => {
  const length = 8;

  const el = render(<CodeInput length={length} />);

  const inputs = el.container.querySelectorAll('input')
  for (let input of inputs) {
    fireEvent.change(input, { target: { value: 1 } })
  }
});
