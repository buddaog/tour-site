
import React, { useEffect, useState } from 'react';
import { availability } from '../data/availability';

const AdminPanel: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [dateControls, setDateControls] = useState<{ direction: string; date: string; available: boolean }[]>([]);

  useEffect(() => {
    const list = Object.entries(availability).map(([key, value]) => {
      const direction = key.charAt(0);
      const date = key.slice(1);
      return { direction, date, available: value };
    });
    setDateControls(list);
  }, []);

  const toggleAvailability = (direction: string, date: string) => {
    const key = direction + date;
    availability[key] = !availability[key];
    setDateControls(prev =>
      prev.map(dc =>
        dc.direction === direction && dc.date === date ? { ...dc, available: !dc.available } : dc
      )
    );
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'lunar' && password === 'LifeP579518660') {
      setLoggedIn(true);
    } else {
      alert('Неверный логин или пароль');
    }
  };

  if (!loggedIn) {
    return (
      <div className="max-w-sm mx-auto mt-32 p-6 bg-white shadow rounded-xl">
        <h2 className="text-xl font-bold mb-4 text-center">Вход в админпанель</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Логин"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Войти
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Админпанель</h1>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Управление доступностью</h2>
        <div className="space-y-4">
          {dateControls.map(dc => (
            <div key={dc.direction + dc.date} className="flex items-center justify-between border p-4 rounded bg-white shadow-sm">
              <span>{dc.direction} — {dc.date}</span>
              <button
                onClick={() => toggleAvailability(dc.direction, dc.date)}
                className={\`px-4 py-1 rounded font-medium text-white \${dc.available ? 'bg-green-500' : 'bg-red-500'}\`}
              >
                {dc.available ? 'Открыто' : 'Закрыто'}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminPanel;
