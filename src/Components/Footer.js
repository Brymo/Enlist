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

const Summary = styled.div`
    display:flex;
    flex-direction:column;
    align-items:flex-start;
    justify-content:center;
    font-size: 1.5rem;

    @media (max-width: 950px){
        font-size: 1rem;
    }
`;

const DetachmentType = styled.div`
    font-size: 1rem;

    @media (max-width: 950px){
        font-size: 1rem;
    }
`;

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

function interrogate(roleCounts){
    return {
        with: (conditions)=>{
            let passes = true;
            conditions.forEach(condition => {
                if(!condition(roleCounts)){
                    passes = false;
                }
            });
            return passes;
        }
    }
}

function createRange(role,min,max){
    return (roleCounts)=>{
        return roleCounts[role] >= min && roleCounts[role] <= max;
    }
}

const patrolConditions = [
    createRange("HQ", 1,2),
    createRange("T", 1,3),
    createRange("E", 0,2),
    createRange("FA", 0,2),
    createRange("HS", 0,2),
    createRange("F", 0,2),
    createRange("LOW", 0,1),
];

const spearheadConditions = [
    createRange("HQ", 2,3),
    createRange("T", 3,6),
    createRange("E", 0,6),
    createRange("FA", 0,3),
    createRange("HS", 0,3),
    createRange("F", 0,2),
    createRange("LOW", 0,1),
];

const outriderConditions = [
    createRange("HQ", 3,5),
    createRange("T", 6,12),
    createRange("E", 3,8),
    createRange("FA", 3,5),
    createRange("HS", 3,5),
    createRange("F", 0,2),
    createRange("LOW", 0,1),
];


export default function Footer(props){
  
    const {army,factionData,total,limiter} = useContext(Context);
    const {value:pointLimit} = limiter

    useLayoutEffect(()=>{
        setTimeout(()=>{
            const clone = [...army];
            const dataToSave = {army:clone, faction: factionData.currentFaction, pointLimit};
            localStorage.setItem("ENLIST_ARMY_LIST", JSON.stringify(dataToSave));
        },0);
    },[army,factionData,pointLimit])

    const roleCount = army.reduce((acc,unit)=>{
        const clone = {...acc};
        clone[unit.model.role] += 1;
        return clone;
    }, {HQ:0, T:0,E:0,FA:0,HS:0,DT:0,F:0,F:0,LOW:0, DRON:0}) 

    const isPatrol = interrogate(roleCount).with(patrolConditions);
    const isSpearhead = interrogate(roleCount).with(spearheadConditions);
    const isOutrider = interrogate(roleCount).with(outriderConditions);

    const detachmentType = isPatrol ? "Patrol":
                           isSpearhead ? "Spearhead":
                           isOutrider ? "Outrider":
                           "Invalid Detachment";

    const isOverTheLimit = !!pointLimit && total > pointLimit;
    const totalStyle = isOverTheLimit ? {color:"red"} : {};

    const detachmentStyle = detachmentType === "Invalid Detachment" ? {color:"red"} : {};

    /*HQ
    * T - Troop
    * E - Elite
    * FA - Fast Attack
    * HS - Heavy Support
    * F - Flyer
    * FO - Fortification
    * DT - Dedicated transport
    */

   return (
        <Bottom>
            <Summary>
                <div style={totalStyle}>{`Total: ${total}pts`}</div>
                <DetachmentType style={detachmentStyle}>{detachmentType}</DetachmentType>
            </Summary>
            <Spacer><FactionChooser/></Spacer>
            <AddButton onClick={()=>{props.addItem()}}>Add + </AddButton>
        </Bottom>
   ) 
}