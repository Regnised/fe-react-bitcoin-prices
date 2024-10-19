import { useState, useRef, useEffect } from 'react';
import SelectInput from '../Select/Select.jsx';
import ResultModal from '../ResultModal.jsx';
import './UserInput.css';

const options = [
  {
    label: '1 minute',
    value: 60000,
  },
  {
    label: '30 minutes',
    value: 60000 * 30,
  },
  {
    label: '1 hour',
    value: 60000 * 60,
  },
];

export default function UserInput() {
  const [interval, setInterval] = useState(options[0].value);
  const dialog = useRef();

  function saveInterval(interval) {
    setInterval(interval);
  }

  function saveIntervalToDB() {
    fetch(`https://lit-beach-53174-edbdac388006.herokuapp.com/interval`, {
      method: 'PUT',
      body: JSON.stringify({ interval }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        dialog.current.showModal();
      })
      .catch(console.error);
  }

  function getInterval() {
    fetch(`https://lit-beach-53174-edbdac388006.herokuapp.com/interval`)
      .then((response) => {
        return response.json();
      })
      .then((resData) => {
        setInterval(resData.data.interval);
      });
  }

  useEffect(() => {
    getInterval();
  }, []);

  return (
    <>
      <ResultModal reff={dialog} interval={interval} />
      <div id="user-input">
        <div className="input-group">
          <p>
            <label htmlFor="interval-select">
              Select price update interval
            </label>
            <SelectInput
              options={options}
              selectedOption={interval}
              setSelectedOption={saveInterval}
            />
            <button onClick={saveIntervalToDB}>Set interval</button>
          </p>
        </div>
      </div>
    </>
  );
}
