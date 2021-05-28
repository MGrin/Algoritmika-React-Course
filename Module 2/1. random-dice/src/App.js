import RandomDices from './components/RandomDices';

export default function App() {
  return (
    <div className="App">
      <h1 data-testid="page-title">Игральные кости</h1>
      <RandomDices />
    </div>
  );
}
