
import React from 'react';
import './components.css';

export default function UnitsPanel(props){

    const {name, points, onClick} = props;
    return(
        <div className="unitRect" onClick={onClick}>
            <div className="unitName">{name}</div>
            <div className="unitPoints">{points}</div>
        </div>
    )

}