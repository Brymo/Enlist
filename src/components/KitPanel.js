
import React, { useEffect } from 'react';
import {useState} from 'react';
import WeaponList from './WeaponList';
import './components.css';
import { mediumslateblue } from 'color-name';


export default function KitPanel(props){

    const {currentSelection, weapons, onSubmit, addToArmy} = props;
    const [shootingWeapons, setShooting] = useState([]);
    const [meleeWeapons, setMelee] = useState([]);
    const [totalPoints, setTotalPoints] = useState(0);
    const [quantity, setQuantity] = useState(1); 

    useEffect(()=>{
        const shootingTotal = shootingWeapons.reduce((acc,weapon)=>{
            return acc + weapon.points;
        },0);
        const meleeTotal = meleeWeapons.reduce((acc,weapon)=>{
            return acc + weapon.points;
        },0);

        const safeQuantity = quantity || 0;
        console.log(safeQuantity,shootingTotal,meleeTotal,currentSelection.points);
        const newTotal =(shootingTotal + meleeTotal + currentSelection.points) * safeQuantity; 
        console.log(newTotal);
        setTotalPoints(newTotal);

    },[shootingWeapons,meleeWeapons,quantity, currentSelection]);

    useEffect(()=>{
        setQuantity(1);
    },[currentSelection]);


    function submit(){

        const toAdd = {name: currentSelection.name, points: totalPoints, weapons:{shooting: shootingWeapons, melee:meleeWeapons}, quantity:quantity }

        quantity > 0 && onSubmit(toAdd);
    }
    


    const emptyPanel = <div className="emptyPanel">{`<< Select a unit to customise`}</div>        

    const renderComponents = (
        <>
            <div className="kitTitle">
                {currentSelection.name}
            </div>
            <WeaponList selectedWeapons={shootingWeapons} weapons={weapons && weapons.shooting} setter={setShooting}/>
            <WeaponList selectedWeapons={meleeWeapons} weapons={weapons && weapons.melee} setter={setMelee}/>
            <span style={{"margin-top": "1rem", "display":"flex", "width":"100%", "align-items":"center"}}>
                <div style={{"margin-right": "1rem"}}>Quantity:</div>
                <input type="number" value={quantity} onChange={(e)=>{
                    const quant = parseInt(e.currentTarget.value,10);
                    setQuantity(quant);
                }}/>
            </span>
            <div className="ENLIST">
                <input type="submit" value="ENLIST" onClick={submit} />
                <div style={{"margin-left":"2rem"}}>Cost: {totalPoints}</div>
            </div>
        </>
    );
    return(
        <div id="KitPanel" className="panel">
            {currentSelection.name === "" ? emptyPanel : renderComponents}
        </div>
    )

}