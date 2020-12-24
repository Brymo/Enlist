import React, { useLayoutEffect } from 'react';
import {useContext} from 'react';
import styled from "styled-components";
import {Context} from "../App";
import FactionChooser from './FactionChoice'

const Bottom = styled.div`

    grid-row: 2/span 1;

    width:100%;
    height: 5rem;
    display:flex;
    justify-content:space-between;
    align-items: center;
    border-top: 1px solid grey ;
    padding: 0 2.5rem;
    font-size: 2.5rem;
    font-weight:bold;
` 

const AddButton = styled.div`
    width: 50vw;
    background-color: #1890ff;
    margin: -2.5rem;
    height:5rem;
    display:flex;
    align-items:center;
    padding-left: 2.5rem;
    cursor: pointer;
    transition: padding-left 0.2s ease-out;

    &:hover{
        padding-left: 2.8rem;
    }

`

export default function Footer(props){
  
    const {army,factionData} = useContext(Context);

    useLayoutEffect(()=>{
        setTimeout(()=>{
            const clone = [...army];
            const dataToSave = {army:clone, faction: factionData.currentFaction};
            console.log(dataToSave);
            localStorage.setItem("ENLIST_ARMY_LIST", JSON.stringify(dataToSave));
        },0);
    },[army,factionData])


    const total = army.reduce((acc,unit)=>{
        return acc + unit.total;
    },0);

   return (
        <Bottom>
            {`Total: ${total}pts`}
            <FactionChooser/>
            <AddButton onClick={()=>{props.addItem()}}>Add + </AddButton>
        </Bottom>
   ) 
}