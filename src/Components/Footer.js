import React, { useLayoutEffect } from 'react';
import {useContext} from 'react';
import styled from "styled-components";
import {Context} from "../App";
import FactionChooser from './FactionChoice'

const Bottom = styled.div`

    grid-row: 3/span 1;

    width:100%;
    height: 5rem;
    display:flex;
    justify-content:space-between;
    align-items: center;
    border-top: 1px solid grey ;
    padding: 0 2.5rem;
    font-size: 2.5rem;
    font-weight:bold;

    @media (max-width: 950px){
        justify-content:flex-start;
        font-size: 1rem;
    }

` 

const Spacer = styled.div`
    margin-left:1rem;
`

const AddButton = styled.div`
    width: 50vw;
    background-color: #1890ff;
    margin: -2.5rem;
    padding-left: 2.5rem;
    height:5rem;
    display:flex;
    align-items:center;
    cursor: pointer;
    transition: padding-left 0.2s ease-out;

    &:hover{
        padding-left: 2.8rem;
    }

    @media (max-width: 950px){
        position:absolute;
        right:0;
        padding-left: 0rem;
        margin: 0rem;
        width: 20vw;
        display:flex;
        justify-content:center;
        align-items:center;
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
            <Spacer><FactionChooser/></Spacer>
            <AddButton onClick={()=>{props.addItem()}}>Add + </AddButton>
        </Bottom>
   ) 
}