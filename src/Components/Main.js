import React, { useCallback, useEffect } from 'react';
import {useState,useContext} from 'react';
import styled from 'styled-components';
import {Button} from 'antd';
import {PlusOutlined} from "@ant-design/icons";
import {Context} from "../App"
import Footer from "./Footer";
import Unit from "./Unit";


const Top = styled.div`
    grid-row: 1/span 1;
    background-color: white;
    width:100%;
    max-height: 100%;
    position:relative;
    padding: 2.5rem;

    display:flex;
    justify-content:flex-start;
    align-items:flex-start;
    flex-wrap:wrap;
    overflow:scroll;
    
`

const AddButton = styled.div`
    position: absolute;
    right:2.5rem;
    bottom:2.5rem;
`

export default function Main(){

    const [units,setUnits] = useState([{id:0}]);
    const [idCount,setIdCount] = useState(1);
    const {data,currentFaction,dispatch} = useContext(Context);

    //load this component with the data it last had when closed
    useEffect(()=>{
        const existingList = localStorage.getItem("ENLIST_ARMY_LIST"); 
        if(existingList){
            existingList.forEach((unit)=>{
                addItem(unit);
            });
        }
    },[])


    const addItem = (unit)=>{
        setIdCount(idCount+1);
        console.log(unit);
        const newItem = {id:idCount,initialData:unit};
        setUnits([...units, newItem]);
    }

    const genDestroyItem = (id)=>{
        return (unitToRemove)=>{
            const newList = units.filter(unit=>unit.id !== id);
            setUnits(newList);
            dispatch({type:"remove", old:unitToRemove})
        }
    }

        //const {dispatch} = Total;
        //dispatch({type:"add", value:1});

    return (
        <>
            <Top>
                {data && data[currentFaction] && units.map((unit)=>{
                    return <Unit key={unit.id} initialData={unit.initialData} selfDestruct={genDestroyItem(unit.id)} factionData={data[currentFaction]}/>
                })}
            </Top>
            <Footer addItem={addItem}/>
        </>
    )  
}