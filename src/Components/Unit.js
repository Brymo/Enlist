import React, { useState, useContext,useLayoutEffect,useEffect, useMemo, useCallback } from "react";
import styled from "styled-components"
import {DeleteOutlined} from "@ant-design/icons";
import {Context} from "../App";
import Equipment from './Equipment';
import {InputNumber, Select,Button} from "antd";
const {Option} = Select;

const UnitBox = styled.div`
    width: 25rem;
    min-height:13rem;
    border-radius:1.25rem;
    box-shadow: 0 0.1rem 0.2rem 0.2rem lightgrey;
    padding:1.25rem;

    display:flex;
    flex-direction: column;
    align-items:center;
    justify-content:space-between;

    margin:0.5rem;

    @media (max-width: 768px){
        width:90vw;
    }
`;

const Row=  styled.span`
    display:flex;
    justify-content:space-between;
    align-items:center;
    width:100%;
    font-size: 2.5rem;
    font-weight:bold;
`;

const CloseRow=  styled.span`
    display:flex;
    justify-content:flex-start;
    align-items:center;
    width:100%;
    font-size: 2.5rem;
    font-weight:bold;
`;

const roleDictionary = {
    HQ:"HQ",
    T:"Troop",
    E :"Elite",
    FA:"Fast Attack",
    HS:"Heavy Support",
    F:"Flyer",
    FO: "Fortification",
    LOW: "Lord Of War"
}

export default function Unit(props){
    const {selfDestruct,factionData, initialData} = props;
    const allData = useContext(Context)
    const {dispatch } = allData;
    const [unitData, setData] = useState({qty:1, model:{name:"",role:"",points:0}, weapons:[],total:0});
    const [currentEquip,setCurrent] = useState({name:"", points:0});
    //const [unitData, setData] = useState({qty:0, name:data[currentFaction]["UNITS"][0].name, weapons:[]});

    const units = useMemo(()=>factionData["UNITS"].concat(factionData["NAMED CHARS"] || []),[factionData])
    const equipment = useMemo(()=>factionData["RANGED WEAPONS"].concat(factionData["MELEE WEAPONS"]).concat(factionData["OTHER WARGEAR"]),[factionData])

    const weaponPoints =  unitData.weapons.reduce((acc,weapon)=>{
        return acc + parseInt(weapon.points)*weapon.qty;
    },0);

    function updateUnit(newUnit){
        dispatch({type:"update",old:unitData,new:newUnit})
        setData(newUnit);
    }

    const total = (weaponPoints + unitData.model.points)*unitData.qty;

    useEffect(()=>{
        const clone = {...unitData};
        clone.total = total;
        updateUnit(clone);
    },[total]);


    useEffect(()=>{
        if(initialData){
            updateUnit(initialData)
            const startingWeapon = initialData.weapons[0] ? initialData.weapons[0].name : equipment[0].name;
            const startingWeaponPoints = initialData.weapons[0] ? initialData.weapons[0].name : equipment[0].name;
            setCurrent({name:startingWeapon,points:startingWeaponPoints});    
        }else{
            const firstModelPoints = parseInt(units[0].points);
            updateUnit({qty:1, model:{name:units[0].name,points:firstModelPoints, role:units[0].role}, weapons:[],total:firstModelPoints});    
            setCurrent({name:equipment[0].name,points:equipment[0].points});    
        }
    },[factionData]);



    const genModData = (field)=>{
        return (val)=>{
            const clone = {...unitData};
            clone[field] = val;
            updateUnit(clone);
        }
    }

    //where model is format name$$points because idk how to do this otherwise
    const changeModel = (model)=>{
        const [name,pointsTxt,role] = model.split("$$");
        const chosenModel = {name,points:parseInt(pointsTxt),role}
        genModData("model")(chosenModel);
    }

    const changeCurrentEquip = useCallback((model)=>{
        const [name,pointsTxt] = model.split("$$");
        const chosenEquip = {name,points:parseInt(pointsTxt)}
        setCurrent(chosenEquip);
    },[])

    const addCurrentToWeapons = ()=>{
       const clone = {...unitData};
       const equipClone = [...clone.weapons];
       const index = clone.weapons.findIndex((wep)=>wep.name === currentEquip.name);

       if(index != -1){
           //increment the old strip
           equipClone[index].qty = equipClone[index].qty + 1;
           clone.weapons = equipClone;
       }else{
           //create a new weapon strip
           const currentClone = {...currentEquip, qty:1};
           clone.weapons = equipClone.concat([currentClone]);
       }

       updateUnit(clone);
    }


    const genRemoveWeapon = (name)=>{
        return ()=>{
            const clone = {...unitData}
            const equipClone = [...clone.weapons];
            const index = equipClone.findIndex((wep)=>wep.name === name);

            const withoutIndex = equipClone.filter((w,i)=>{
                return i != index;
            })

            clone.weapons = withoutIndex;
            updateUnit(clone);
        }
    }

    function changeWeaponQty(name){
        return (qty)=>{
            const clone = {...unitData}
            const equipClone = [...clone.weapons];
            
            const index = equipClone.findIndex((wep)=>{return wep.name === name});
            
            if(index != -1){
                equipClone[index].qty = qty;            
                clone.weapons = equipClone;
                updateUnit(clone);
            }
        }
    }

    console.log(units);

    return (
        <div className="unitCard">
        <UnitBox>
           <CloseRow>
               <Select value={unitData.model.name} style={{width:"50%"}} onChange={changeModel} showSearch>
                   {units.map((unit)=>{
                       return (<Option key={unit.name} value={`${unit.name}$$${unit.points}$$${unit.role}`} >
                        {`[${unit.role}] ${unit.name} - ${unit.points}`}
                       </Option>)
                   })}
               </Select>
               <InputNumber  value={unitData.qty} min={0} step={1} onChange={genModData("qty")}/>
           </CloseRow> 
           <CloseRow>
               <Select value={currentEquip.name} style={{width:"50%"}} onChange={changeCurrentEquip} showSearch>
                   {equipment.map((e)=>{
                       return (<Option key={e.name} value={`${e.name}$$${e.points}`} >
                        {`${e.name} - ${e.points}`}
                       </Option>)
                   })}
               </Select>
               <Button type="primary" onClick={addCurrentToWeapons}>Add</Button>
           </CloseRow>
           {unitData.weapons.map((weapon)=>{
               return <Equipment id={weapon.name} equipment={weapon} changeQuantity={changeWeaponQty(weapon.name)} selfDestruct={genRemoveWeapon(weapon.name)}/>
           })}
           <Row>
                {`${total}pts - ${roleDictionary[unitData.model.role]}`}
                <Button className="showOnHover" shape="circle" type="danger" icon={<DeleteOutlined/>} size="large" onClick={()=>{selfDestruct(unitData)}}/> 
           </Row>
        </UnitBox>
        </div>
    )
}