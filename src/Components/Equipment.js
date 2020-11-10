import React from 'react';
import "./component.css"
import {Button,InputNumber} from 'antd';
import {CloseOutlined} from "@ant-design/icons";
import styled from "styled-components";

const Strip = styled.span`
    background-color: lightgray;
    width:100%;
    margin: 0.25rem;
    padding:0.5rem;

    font-weight:bold;
    display:flex;
    justify-content:space-between;
` 

export default function Equipment(props){

    const {equipment,selfDestruct,changeQuantity} = props;

    return (
        <Strip className="strip">
            <InputNumber value={equipment.qty} min={0} onChange={changeQuantity}/>
            {`${equipment.name} - ${equipment.points}`}
            <Button className="showOnHover" size="small" shape="circle" type="danger" icon={<CloseOutlined/>} onClick={selfDestruct}/>
        </Strip>
    )

}


