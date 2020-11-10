import React, { useEffect } from 'react';
import {useContext} from 'react';
import styled from "styled-components";
import {Context} from "../App";

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
`

export default function Footer(props){
  
    const {army} = useContext(Context);

    useEffect(()=>{
        localStorage.setItem("ENLIST_ARMY_LIST", army);
    },[army])

    console.log(army);

    const total = army.reduce((acc,unit)=>{
        return acc + unit.total;
    },0);

    

   return (
    <Bottom>
        {`Total: ${total}pts`}
        <AddButton onClick={()=>{props.addItem()}}>Add + </AddButton>
    </Bottom>
   ) 
}