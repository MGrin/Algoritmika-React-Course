import ProductsList from "./components/ProductsList";

export default function App() {
  return (
    <div className="App">
      <h1 data-testid="page-title">Список товаров</h1>
      <ProductsList />
    </div>
  );
}
