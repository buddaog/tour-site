import React, { useEffect, useState } from 'react';

interface Registration {
  id: number;
  name: string;
  surname: string;
  phone: string;
  direction: string;
  people: number;
  date: string;
  comment: string;
}

interface DirectionControl {
  direction: string;
  date: string;
  available: boolean;
}

const AdminPanel: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [controls, setControls] = useState<DirectionControl[]>([]);

  const storedControls = localStorage.getItem('directionControls');
  useEffect(() => {
    const regData = localStorage.getItem('registrations');
    if (regData) {
      setRegistrations(JSON.parse(regData));
    }
    if (storedControls) {
      setControls(JSON.parse(storedControls));
    }
  }, []);

  const handleLogin = () => {
    if (username === 'lunar' && password === 'LifeP579518660') {
      setLoggedIn(true);
    } else {
      alert('Неверный логин или пароль');
    }
  };

  const toggleAvailability = (direction: string, date: string) => {
    const updated = controls.map((item) =>
      item.direction === direction && item.date === date
        ? { ...item, available: !item.available }
        : item
    );
    setControls(updated);
    localStorage.setItem('directionControls', JSON.stringify(updated));
  };

  return (
    <div className="p-6">
      {!loggedIn ? (
        <div className="max-w-xs mx-auto space-y-4">
          <input
            type="text"
            placeholder="Login"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            Войти
          </button>
        </div>
      ) : (
        <div>
          <h1 className="text-xl font-bold mb-4">Заявки</h1>
          <div className="space-y-2 mb-6">
            {registrations.map((reg) => (
              <div key={reg.id} className="border p-4 rounded bg-white">
                <p><strong>Имя:</strong> {reg.name} {reg.surname}</p>
                <p><strong>Номер:</strong> {reg.phone}</p>
                <p><strong>Направление:</strong> {reg.direction}</p>
                <p><strong>Дата:</strong> {reg.date}</p>
                <p><strong>Людей:</strong> {reg.people}</p>
                <p><strong>Комментарий:</strong> {reg.comment}</p>
              </div>
            ))}
          </div>

          <h2 className="text-lg font-semibold mb-2">Ограничения по датам</h2>
          <div className="space-y-2">
            {controls.map((dc, i) => (
              <div key={i} className="flex justify-between items-center border p-2 rounded">
                <div>
                  <strong>{dc.direction}</strong> — {dc.date}
                </div>
                <button
                  onClick={() => toggleAvailability(dc.direction, dc.date)}
                  className={`px-4 py-1 rounded font-medium text-white ${dc.available ? 'bg-green-500' : 'bg-red-500'}`}
                >
                  {dc.available ? 'Открыто' : 'Закрыто'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
