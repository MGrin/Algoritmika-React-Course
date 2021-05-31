import StyledButton from './components/StyledButton';

export default function App({ dark }) {
  return (
    <div className="App">
      <h1 data-testid="page-title">Стильная кнопка</h1>
      <StyledButton dark={dark}>
        Стильная кнопка!
      </StyledButton>
    </div>
  );
}
