import React,{useState,useEffect,useReducer} from 'react';
import './App.css';
import Main from "./Components/Main";
import styled from 'styled-components';
import { array } from 'prop-types';

const Context = React.createContext();

const All = styled.div`
  width:100%;
  height: 99.9vh;
  display: grid;
  grid-template-rows: 1fr 5rem;
  grid-template-columns: 1fr;
`

const reducer = function(army,action){

  function removeUnit(toRemove){
    let firstInstanceRemoved = false;
    return army.filter((unit)=>{
      if(firstInstanceRemoved){return true};
      let isKept = true;
      if(unit.qty === toRemove.qty && toRemove.model.name === unit.model.name){
        const weaponsOnRemoved = toRemove.weapons;
        const weaponsOnUnit = unit.weapons;
        if(weaponsOnRemoved.length == weaponsOnUnit.length){
          const diffWeapons = weaponsOnRemoved.filter(weaponOnRemoved=>{
            return !weaponsOnUnit.find(weaponOnUnit=>weaponOnUnit.name === weaponOnRemoved.name);
          });
          
          if(diffWeapons.length === 0){
            isKept = false;
          }

        }
      }
      if(!isKept){firstInstanceRemoved = true};
      return isKept;
    })
  }


  const toRemove = action.old;
  switch(action.type){
    case "update":
      return removeUnit(toRemove).concat(action.new);
      break;
    case "remove": 
      //deep comparison on qty, model, weapons
      return removeUnit(toRemove); 
      break;
  }
  return "error";
}

function App() {

  const [data,setData] = useState({});
  const [army,dispatch] = useReducer(reducer,[]);
  const [factions,setFactions] = useState({currentFaction: "", factionList:[]});


  useEffect(()=>{
    const existingList = JSON.parse(localStorage.getItem("ENLIST_ARMY_LIST")); 
    console.log(existingList);
    fetch('https://raw.githubusercontent.com/Brymo/Enlist/master/public/Data.json').then(v=>v.json()).then(data=>{
      console.log(data);
      setData(data);
      const factionKeys = Object.keys(data); 
      setFactions({currentFaction:existingList.faction || factionKeys[0], factionList:factionKeys, factionSetter:setFactions});
    });
  },[])
  

  return (
    <>
      <Context.Provider value={{data,factionData:factions,army, dispatch }}>
        <All>
          <Main/>
        </All>
      </Context.Provider>
    </>
  );
}

export default App;
export {Context};
