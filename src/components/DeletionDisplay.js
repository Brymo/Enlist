
import React from 'react';
import Equips from './Equips';
import {useState} from 'react';


export default function DeletionDisplay(props) {

    const {deleteItem, object, equips, quantity} = props

        return (
        <div className="deletionDisplay">
            <div className="details">
                <div >{`${quantity ? `${quantity} ` : ""}${object.name} - ${object.points}`}</div>
                {equips && <Equips equips={equips}/>}
            </div>
            <div className="deleteDisplay" onClick={()=>{deleteItem(object.name)}}>x</div>
        </div>
    );
}

