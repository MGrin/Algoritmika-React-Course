import React from 'react';
import { render, screen } from '@testing-library/react';
import App, { IMAGES, INTERVAL } from './App';
import ImagesGallery from './components/ImagesGallery';

const itif = (condition) => condition ? it : it.skip;

let runTestCondition = ImagesGallery.prototype instanceof React.Component
it('ImagesGallery компонент должен наследовать React.Component', () => {
  expect(ImagesGallery.prototype instanceof React.Component).toBeTruthy();
});

itif(runTestCondition)('Корректно отрисовывает компонент App', () => {
  render(<App />);
  const title = screen.getByTestId('page-title');
  expect(title).toBeInTheDocument();
  expect(title.innerHTML).toBe('Галлерея');
});

itif(runTestCondition)('Содержит тег img с data-testid равным "image"', () => {
  render(<App />);
  const imageEl = screen.getByTestId('image');
  expect(imageEl).toBeInTheDocument();
  expect(imageEl.tagName).toBe('IMG');
});

itif(runTestCondition)('Содержит тег button с data-testid равным "previous-image"', () => {
  render(<App />);
  const prevEl = screen.getByTestId('previous-image');
  expect(prevEl).toBeInTheDocument();
  expect(prevEl.tagName).toBe('BUTTON');
});

itif(runTestCondition)('Содержит тег button с data-testid равным "next-image"', () => {
  render(<App />);
  const nextEl = screen.getByTestId('next-image');
  expect(nextEl).toBeInTheDocument();
  expect(nextEl.tagName).toBe('BUTTON');
});

itif(runTestCondition)('Содержит элемент с data-testid равным "image-name"', () => {
  render(<App />);
  const imgName = screen.getByTestId('image-name');
  expect(imgName).toBeInTheDocument();
});

itif(runTestCondition)('Изначально показывает первую картинку из массива images, переданного в props', () => {
  render(<App />);
  const imgNameEL = screen.getByTestId('image-name');
  const imageEl = screen.getByTestId('image');
  expect(imgNameEL.innerHTML).toBe(IMAGES[0].name);
  expect(imageEl.src).toBe(IMAGES[0].url);
});

itif(runTestCondition)('При нажатии на кнопку перехода на следующую картинку, картинка на экране меняется', () => {
  render(<App />);
  const imgNameEL = screen.getByTestId('image-name');
  const imageEl = screen.getByTestId('image');
  const nextEl = screen.getByTestId('next-image');

  nextEl.click()
  expect(imgNameEL.innerHTML).toBe(IMAGES[1].name);
  expect(imageEl.src).toBe(IMAGES[1].url);
});

itif(runTestCondition)('При нажатии на кнопку перехода на предыдущую картинку, картинка на экране меняется', () => {
  render(<App />);
  const imgNameEL = screen.getByTestId('image-name');
  const imageEl = screen.getByTestId('image');
  const nextEl = screen.getByTestId('next-image');
  const prevEl = screen.getByTestId('previous-image');

  nextEl.click()
  nextEl.click()
  expect(imgNameEL.innerHTML).toBe(IMAGES[2].name);
  expect(imageEl.src).toBe(IMAGES[2].url);
  prevEl.click()
  expect(imgNameEL.innerHTML).toBe(IMAGES[1].name);
  expect(imageEl.src).toBe(IMAGES[1].url);
});

itif(runTestCondition)('При нажатии на кнопку перехода на следующую картинку в конце списка картинок, картинка на экране меняется на первую', () => {
  render(<App />);
  const imgNameEL = screen.getByTestId('image-name');
  const imageEl = screen.getByTestId('image');
  const nextEl = screen.getByTestId('next-image');

  
  nextEl.click()
  expect(imgNameEL.innerHTML).toBe(IMAGES[1].name);
  expect(imageEl.src).toBe(IMAGES[1].url);

  for (let i = 0; i < IMAGES.length - 2; i++) {
    nextEl.click()
  }

  expect(imgNameEL.innerHTML).toBe(IMAGES[IMAGES.length - 1].name);
  expect(imageEl.src).toBe(IMAGES[IMAGES.length - 1].url);

  nextEl.click()
  expect(imgNameEL.innerHTML).toBe(IMAGES[0].name);
  expect(imageEl.src).toBe(IMAGES[0].url);
});

itif(runTestCondition)('При нажатии на кнопку перехода на предыдущую картинку в начале списка, картинка на экране меняется на последнюю в списке', () => {
  render(<App />);
  const imgNameEL = screen.getByTestId('image-name');
  const imageEl = screen.getByTestId('image');
  const prevEl = screen.getByTestId('previous-image');

  prevEl.click()
  expect(imgNameEL.innerHTML).toBe(IMAGES[IMAGES.length - 1].name);
  expect(imageEl.src).toBe(IMAGES[IMAGES.length - 1].url);
});

itif(runTestCondition)(`Картинка меняется каждые ${INTERVAL / 1000} секунд`, (done) => {
  render(<App />);
  const imgNameEL = screen.getByTestId('image-name');
  const imageEl = screen.getByTestId('image');

  expect(imgNameEL.innerHTML).toBe(IMAGES[0].name);
  expect(imageEl.src).toBe(IMAGES[0].url);

  setTimeout(() => {
    expect(imgNameEL.innerHTML).toBe(IMAGES[1].name);
    expect(imageEl.src).toBe(IMAGES[1].url);
    done()
  }, INTERVAL + 200)
});

itif(runTestCondition)(`Таймер начинается с начала при ручном изменении картинки`, (done) => {
  render(<App />);
  const imgNameEL = screen.getByTestId('image-name');
  const imageEl = screen.getByTestId('image');
  const nextEl = screen.getByTestId('next-image');

  expect(imgNameEL.innerHTML).toBe(IMAGES[0].name);
  expect(imageEl.src).toBe(IMAGES[0].url);

  setTimeout(() => {
    nextEl.click();
    expect(imgNameEL.innerHTML).toBe(IMAGES[1].name);
    expect(imageEl.src).toBe(IMAGES[1].url);
  }, INTERVAL / 2);

  setTimeout(() => {
    expect(imgNameEL.innerHTML).toBe(IMAGES[1].name);
    expect(imageEl.src).toBe(IMAGES[1].url);
  }, INTERVAL);

  setTimeout(() => {
    expect(imgNameEL.innerHTML).toBe(IMAGES[2].name);
    expect(imageEl.src).toBe(IMAGES[2].url);
    done()
  }, INTERVAL / 2 + INTERVAL + 200)
});