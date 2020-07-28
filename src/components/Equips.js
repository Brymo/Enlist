
import React from 'react';

export default function DeletionDisplay(props) {

    const {shooting, melee} = props.equips;

        return (
        <div className="equips">
            <div><u>Shooting Weapons</u></div>
            {shooting.map(weapon=>{
                return <div>{`${weapon.name} - ${weapon.points}`}</div>;
            })}
            {shooting.length === 0 && <div>None</div>}
           <div><u>Melee Weapons</u></div>
           {melee.map(weapon=>{
               return <div>{`${weapon.name} - ${weapon.points}`}</div>;
           })}
           {melee.length === 0 && <div>None</div>}
        </div>
    );
}

