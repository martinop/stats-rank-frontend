import React, { useState } from 'react';
import Dropdown from 'react-dropdown';
import html2canvas from 'html2canvas'
import { spain as _spainParticipants } from './data';
import 'react-dropdown/style.css';
import './App.css'; 
import './tailwind.output.css';

const initialState = { first: '', second: '', third: '', playOff: '', firstDescend: '', secondDescend: ''}

function App() {
  const [positions, setPositions] = useState(initialState)
  const [competition, setCompetition] = useState('España');
  const [username, setUsername] = useState('');

  function onChangeParticipant(field) {
    return function({ value }) {
      setPositions({ ...positions, [field]: value })
    }
  }

  function onDownload() {
    html2canvas(document.getElementById('capture'), { useCORS: true, scrollX: 0, scrollY: -window.scrollY })
      .then(canvas => {
        try {
          const link = document.createElement('a');
          if (typeof link.download === 'string') {
            link.href = canvas.toDataURL();
            link.download = "prediccion.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } else {
            window.open(canvas.toDataURL());
          }
        } catch(e) {
          console.log(e)
        }
      })
  }

  const spainParticipants = _spainParticipants
    .reduce((prev, current) => {
      const values = Object.values(positions);
      if(values.includes(current.name)) return [...prev, current]
      return [current, ...prev]
    }, [])
    .map(e => ({ label: e.name, value: e.name }))
  return (
    <div className="p-12 flex justify-center">
      <div className="w-2/5 flex flex-col bg-gray-800 rounded-md p-4">
        <h2 className="text-white">Competición</h2>
        <Dropdown options={["España"]} onChange={({ value }) => setCompetition(value)} placeholder="Competición" value={competition} />
        <h2 className="text-white mt-4">Tu @:</h2>
        <input value={username} onChange={e => setUsername(e.target.value)} type="text" />
        <h2 className="text-white mt-4">1er Lugar:</h2>
        <Dropdown options={spainParticipants} onChange={onChangeParticipant('first')} placeholder="Selecciona el 1er lugar" value={positions.first} />
        <h2 className="mt-4 text-white">2do Lugar:</h2>
        <Dropdown options={spainParticipants} onChange={onChangeParticipant('second')} placeholder="Selecciona el 2do lugar" value={positions.second} />
        <h2 className="mt-4 text-white">3er Lugar:</h2>
        <Dropdown options={spainParticipants} onChange={onChangeParticipant('third')} placeholder="Selecciona el 3er lugar" value={positions.third} />
        <h2 className="mt-4 text-white">Playoff:</h2>
        <Dropdown options={spainParticipants} onChange={onChangeParticipant('playOff')} placeholder="Selecciona el Playoff" value={positions.playOff} />
        <h2 className="mt-4 text-white">1er Descendido:</h2>
        <Dropdown options={spainParticipants} onChange={onChangeParticipant('firstDescend')} placeholder="Selecciona el 1er lugar" value={positions.firstDescend} />
        <h2 className="mt-4 text-white">2do Descendido:</h2>
        <Dropdown options={spainParticipants} onChange={onChangeParticipant('secondDescend')} placeholder="Selecciona el 1er lugar" value={positions.secondDescend} />
      </div>
      <div className="pl-4 rounded-md ">
        <div
          id="capture"
          style={{ backgroundImage: 'url(https://pbs.twimg.com/media/EcmPn-kWoAIajFz.jpg)'}}
          className='bg-white relative text-white bg-cover image-container flex flex-col justify-end pl-8 pb-6'
        >
          <div className="header">
            <div className="your-predictions">
              <h2>MIS</h2>
              <h2>PREDICCIONES</h2>
            </div>
            <h2 className="text-4xl leading-none">{username && `@${username} / `}{`FMS ${competition}`}</h2>
          </div>
          {positions.first && (
            <div className="flex items-center">
              <img src="/badget-1.png" alt="Campeon" className="h-6 mr-2"/>
              <h2 className="text-3xl">{positions.first}</h2>
            </div>
          )}
          {positions.second && (
            <div className="flex items-center">
              <img src="/badget-2.png" alt="Subcampeon"  className="h-6 mr-2"/>
              <h2 className="text-3xl">{positions.second}</h2>
            </div>
          )}
          {positions.third && (
            <div className="flex items-center">
              <img src="/badget-3.png" alt="Tercero"  className="h-6 mr-2"/>
              <h2 className="text-3xl">{positions.third}</h2>
            </div>
          )}
          {positions.playOff && (
            <div>
              <h2 className="text-3xl">{positions.playOff}</h2>
            </div>
          )}
          {positions.firstDescend && (
            <div>
              <h2 className="text-3xl">{positions.firstDescend}</h2>
            </div>
          )}
          {positions.secondDescend && (
            <div>
              <h2 className="text-3xl">{positions.secondDescend}</h2>
            </div>
          )}
          <h2 className="follow-us text-yellow-400">@fmsstatsof</h2>
        </div>
        <button onClick={onDownload} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Descargar
        </button>
      </div>
    </div>
  );
}

export default App;
