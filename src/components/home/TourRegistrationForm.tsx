
import React, { useState, useEffect } from 'react';
import { availability } from '../../data/availability';

const TourRegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    direction: '',
    people: 1,
    date: '',
    comment: ''
  });

  const [minDate, setMinDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();
    const tomorrow = new Date();
    tomorrow.setDate(now.getDate() + 1);
    const overmorrow = new Date();
    overmorrow.setDate(now.getDate() + 2);

    const targetDate = hour >= 22 ? overmorrow : tomorrow;
    setMinDate(targetDate.toISOString().split('T')[0]);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);

    if (newFormData.direction && newFormData.date) {
      const key = newFormData.direction + newFormData.date;
      if (!availability[key]) {
        setError('На выбранную дату и направление регистрация закрыта.');
      } else {
        setError('');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (error) return;
    console.log('Submitted:', formData);
    // TODO: отправка данных
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-xl my-10">
      <h2 className="text-2xl font-bold mb-4">Регистрация на тур</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <input type="text" name="firstName" placeholder="Имя" required onChange={handleChange} className="border p-2 rounded" />
        <input type="text" name="lastName" placeholder="Фамилия" required onChange={handleChange} className="border p-2 rounded" />
        <input type="tel" name="phone" placeholder="Телефон" required onChange={handleChange} className="border p-2 rounded" />
        <input type="text" name="direction" placeholder="Направление" required onChange={handleChange} className="border p-2 rounded" />
        <input type="number" name="people" placeholder="Кол-во человек" min="1" required onChange={handleChange} className="border p-2 rounded" />
        <input type="date" name="date" min={minDate} required onChange={handleChange} className="border p-2 rounded" />
        <textarea name="comment" placeholder="Комментарий" onChange={handleChange} className="border p-2 rounded"></textarea>

        {error && <div className="text-red-600 font-semibold">{error}</div>}

        <button type="submit" disabled={!!error} className="bg-secondary-500 text-white py-2 px-4 rounded hover:bg-secondary-600 transition disabled:opacity-50">
          Отправить
        </button>
      </form>
    </div>
  );
};

export default TourRegistrationForm;
