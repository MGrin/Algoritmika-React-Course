import { useCallback, useState } from 'react';
import CodeInput from './components/CodeInput';

export default function App() {
  const [code, setCode] = useState('')
  const handleChange = useCallback((newCode) => {
    setCode(newCode)
  }, [setCode]);

  return (
    <div className="App">
      <h1 data-testid="page-title">Код</h1>
      <CodeInput defaultValue="123" length={5} onChange={handleChange} />
      <p>{code}</p>
    </div>
  );
}
