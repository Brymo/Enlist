import React from 'react';
import './components.css';
import {useState,useMemo} from 'react';
import UnitRect from './UnitRect';
import SearchBar from './SearchBar';

export default function UnitsPanel(props){

    const [currentSelection, setSelection] = useState("");
    const [validItems, setValidItems] = useState([]);
    

    const {onSelection,units} = props;

    const sortedUnits = units && units.sort((a,b)=>{
        return a.name > b.name;
    });

    function onSelect(unit){
        onSelection(unit);
        setSelection(unit);
    }

    const allUnitNames = useMemo(()=>{return units && units.map(unit=>unit.name)}, [units]);
    const filteredUnits = units && sortedUnits.filter(unit => !!validItems.find(item=>item === unit.name));

    const listToDisplay =  !!filteredUnits && filteredUnits.length > 0 ? filteredUnits : sortedUnits;
    console.log(listToDisplay);

    return(
        <div id="UnitsPanel" className="panel">
            <SearchBar items={allUnitNames} setValidItems={setValidItems}/>
            {listToDisplay && listToDisplay.map((unit)=>{
                return unit && <UnitRect name={unit.name} points={unit.points} onClick={
                    ()=>{
                        onSelect(unit);
                    }
                } key={unit.name + unit.points}/> 
            })}
        </div>
    )

}