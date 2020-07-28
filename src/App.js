import React from 'react';
import {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import './components/UnitsPanel';
import UnitsPanel from './components/UnitsPanel';
import KitPanel from './components/KitPanel';
import ArmyPanel from './components/ArmyPanel';


function App() {

  const [currentSelection, setSelection] = useState({name:"", points:0});
  const [data,setData] = useState(null);
  const [army,setArmy] = useState([]);


  useEffect(()=>{
    const data = require('./jsons/Necron');
    setData(data)
  },[]);

  function addToArmy(unit){
    const clone = [...army];
    const copy = clone.concat([unit]);
    setArmy(copy);
  }

  return (
    <div className="main">
      <UnitsPanel onSelection={setSelection} units={data && data.necrons.units}/>
      <KitPanel onSubmit={addToArmy} currentSelection={currentSelection} weapons={ data && data.necrons.weapons}/>
      <ArmyPanel army={army} setArmy={setArmy}/>
    </div>
  );
}

export default App;
