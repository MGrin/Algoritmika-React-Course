import ImagesGallery from './components/ImagesGallery';

export const IMAGES = [{
  name: 'Москва',
  url: 'https://traveller-eu.ru/sites/default/files/styles/index/public/moscow-3550477_1280_0.jpg?itok=JWaobhQK',
}, {
  name: 'Санкт-Петербург',
  url: 'https://www.uralairlines.ru/upload/iblock/f6e/f6e5aa4422be5787363c0edf6bde1fd9.jpg',
}, {
  name: 'Казань',
  url: 'https://flysmartavia.com/media/images/city/20200707_kaz.jpg',
}];

export const INTERVAL = 3000;

export default function App() {
  return (
    <div className="App">
      <h1 data-testid="page-title">Галлерея</h1>
      <ImagesGallery images={IMAGES} interval={INTERVAL} />
    </div>
  );
}
