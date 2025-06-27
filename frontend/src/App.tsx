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

  useEffect(() => {
    axios.get('/cards').then(res => setCards(res.data));
  }, []);

  return (
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
  );
};

export default App;
