
import React, { useCallback } from 'react';  
import './components.css';
import DeletionDisplay from './DeletionDisplay';
import { element } from 'prop-types';


export default function UnitsPanel(props){

    const {army,setArmy} = props;

    function sumPoints(){
        return army.reduce((acc,unit)=>{
            return acc+unit.points;
        },0);
    }


    function deleteItem(unit){
        const clone = [...army];
        const withoutUnit = clone.filter((UNIT)=>{
            return unit != UNIT;
        });
        setArmy(withoutUnit);
    }

    const toJson = useCallback(()=>{
        const str = JSON.stringify(army);
        
        const elem = document.createElement('a');
        elem.setAttribute('href', "data:text/plain;charset=utf-8,"+encodeURIComponent(str));
        elem.setAttribute('download', "WarhammerArmy.json");
        elem.click();
    }, [army]);

    const importArmy = (e)=>{
        const file = e.target.file;
        console.log(e.currentTarget);
    }

    const emptyPanel = <div className="emptyPanel">{`<< Customise a model to add to your army`}</div>        
    const filledPanel = army.map((unit)=>{
                            return <DeletionDisplay object={unit} deleteItem={()=>{deleteItem(unit)}} equips={unit.weapons} quantity={unit.quantity} key={unit.id}/>
                        })

        return(
        <div id="ArmyPanel" className="panel">
            <div className="craftedModels">{army.length > 0 ? filledPanel : emptyPanel}</div>
            <span className="ArmyFooter">
                <div className="totalArmyPoints">{`Total: ${sumPoints()}`}</div>
                <div className="impExp">
                    <input type="file" label="Import Army" onChange={importArmy}/>
                    <input type="button" value="Export Army" onClick={toJson}/>
                </div>
            </span>
        </div>
    )

}


/*
name: "Doomsday Ark"
​​
points: 193
​​
quantity: 1
​​
weapons: {…}
​​​
    melee: Array []
​​​
    shooting: Array []
*/ 