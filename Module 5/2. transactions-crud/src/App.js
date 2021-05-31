import ProductsList from './components/ProductsList';

export const PRODUCTS = [{
  name: 'iPhone',
  available: true,
}, {
  name: 'Буткемп Алгоритмики',
  available: true,
}, {
  name: 'Tesla',
  available: false,
}, {
  name: 'PlayStation 5',
  available: false,
}, {
  name: 'Armada Skis',
  available: true,
}]

export default function App() {
  return (
    <div className="App">
      <h1 data-testid="page-title">Список товаров</h1>
      <ProductsList products={PRODUCTS} />
    </div>
  );
}
