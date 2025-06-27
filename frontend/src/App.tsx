import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Card {
  id: number;
  title: string;
  phase: string;
}

const phases = [
  'Solicitação',
  'Aprovação de Solicitação',
  'Cotação',
  'Aprovação de Compra',
  'Pedido de Compra',
  'Conclusão de Compra',
  'Recebimento de Material',
  'Arquivado'
];

const App: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [title, setTitle] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (token) {
      axios.get('/cards', { headers: { Authorization: `Bearer ${token}` } }).then(res => setCards(res.data));
    }
  }, [token]);

  const login = async () => {
    const res = await axios.post('/auth/login', { email: 'admin@example.com', password: 'password' });
    localStorage.setItem('token', res.data.token);
    setToken(res.data.token);
  };

  const createCard = async () => {
    const res = await axios.post('/cards', { title }, { headers: { Authorization: `Bearer ${token}` } });
    setCards([...cards, res.data]);
    setTitle('');
  };

  if (!token) {
    return <button onClick={login}>Login</button>;
  }

  return (
    <div>
      <div>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Título" />
        <button onClick={createCard}>Criar Solicitação</button>
      </div>
      <div style={{ display: 'flex' }}>
        {phases.map(phase => (
          <div key={phase} style={{ margin: '0 10px' }}>
            <h3>{phase}</h3>
            {cards
              .filter(c => c.phase === phase)
              .map(c => (
                <div key={c.id} style={{ border: '1px solid #ccc', padding: 4 }}>
                  {c.title}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
