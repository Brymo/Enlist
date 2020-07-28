import React from 'react';
import DeletionDisplay from './DeletionDisplay';

export default function WeaponList(props){

    const {selectedWeapons,weapons, setter} = props;

    const selectedWeaponsDisplay = selectedWeapons.map((weapon)=>{
                                        return <DeletionDisplay deleteItem={deleteWeapon(selectedWeapons,setter)}  object={weapon}/>;
                                    })
    const empty = <div style={{"color":"grey"}}>{"No weapons selected...."}</div>;
    const addAnother = <div style={{"color":"grey"}}>{"Add another weapon...."}</div>;

    const sortedWeapons = weapons && weapons.sort((a,b)=>{
        return a.name > b.name;
    });

    return (
        <div className="weaponList">
            <div className="listTitle">Shooting</div>
            { selectedWeapons.length > 0 ? selectedWeaponsDisplay : empty}
            { selectedWeapons.length > 0  && addAnother}
            <select name="shooting">
                {sortedWeapons.map((weapon)=>{
                    return <option  onClick={()=>{addToWeapons(weapon.name,weapon.points,selectedWeapons,setter)}} value={weapon.name}>{`${weapon.name} - ${weapon.points}`}</option> 
                })}
            </select>                
        </div>
    )

}

function deleteWeapon(weaponList, setter){
    return (weaponName)=>{
        const clone = [...weaponList];
        const withoutWeapon = clone.filter((weapon)=>{
            return weaponName != weapon.name;
        });

        setter(withoutWeapon);            
    }
}

function addToWeapons(name, points,weaponList,setter){
    const clone = [...weaponList];
    const added = clone.concat({name:name, points:points});        

    setter(added);
}