import './App.css';

import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface DataType {
  sortedArray: number[];
}

export default function App() {
  const [numbers, setNumbers] = useState('');
  const [loading, setLoading] = useState(false);

  function clickButton() {
    if (loading) {
      return;
    }

    const list = numbers.replace(/\s/g, '').split(',');

    if (!list.length || !numbers) {
      toast.error('Você deve preencher algo');
      return;
    }

    const listNumbers: number[] = [];

    let error = false;

    list.forEach((item) => {
      if (isNaN(+item)) {
        toast.error('Utilize apenas números');
        error = true;
      } else {
        listNumbers.push(+item);
      }
    });

    if (error) {
      return;
    }

    setLoading(true);

    axios
      .post(import.meta.env.VITE_API_URL, listNumbers)
      .then((response) => {
        setLoading(false);
        setNumbers('');

        const data = response.data as DataType;

        toast.success('Sucesso!');
        toast.info(`Lista ordenada: ${data.sortedArray.join(', ')}`);
      })
      .catch(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <div className='card'>
        <label htmlFor='numbers'>Lista de números</label>
        <input
          id='numbers'
          type='text'
          placeholder='ex: 1, 5, 7, 2'
          onChange={(e) => setNumbers(e.target.value)}
          value={numbers}
        />
        <button onClick={clickButton}> Enviar </button>
      </div>
    </>
  );
}
