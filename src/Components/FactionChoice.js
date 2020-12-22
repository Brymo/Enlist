import React,{useState,useContext} from 'react';
import {Context} from "../App";
import {Select} from "antd";
const {Option} = Select;

export default function FactionChoice(){

    const {currentFaction,factionList,factionSetter} = useContext(Context).factionData;

    function setFaction(selection){
        const clone = {currentFaction:selection, factionList:[...factionList], factionSetter};
        clone.currentFaction = selection;
        console.log(clone);
        factionSetter(clone);
    }

    return(
        <div style={{minWidth:"10rem", width:"20%"}}>
            <Select value={currentFaction} style={{minWidth:"10rem", width:"100%"}} onChange={setFaction} showSearch>
                {factionList.map((faction)=>{
                    return (<Option key={faction} value={faction}>
                    {faction}
                    </Option>)
                })}
            </Select>
        </div>
    )

}