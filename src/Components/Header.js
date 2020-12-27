import React, { useCallback, useState } from "react";
import { Button,Tooltip,Drawer } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useContext } from "react";
import styled from "styled-components";
import { Context } from "../App";

const Top = styled.div`
  grid-row: 1 / span 1;

  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 2.5rem;
  font-size: 2.5rem;
  font-weight: bold;
  box-shadow: 0 0.1rem 0.1rem 0.1rem lightgrey;

  @media (max-width: 950px) {
    font-size: 1rem;
  }
`;

const PageTitle = styled.div`
    position:absolute;
    left:3rem;
    font-size:1rem;

`

export default function Footer(props) {
  const { army } = useContext(Context);
  const [isOpen, setOpen] = useState(false);

  function openList() {
    setOpen(true);
  }
  function closeList() {
    setOpen(false);
  }

  const total = army.reduce((acc, unit) => {
    return acc + unit.total;
  }, 0);

  const createListUnit = useCallback((armyUnit) => {
    return (
      <div style={{margin:"2rem 0"}}>
        <h2>
          {armyUnit.qty} {armyUnit.model.name}
        </h2>
        <h3>{armyUnit.weapons.length > 0 ? "Weapons" : "Weapons - None"}</h3>
        <ul>
          {armyUnit.weapons.map((weapon) => {
            return <li>{weapon.name}</li>;
          })}
        </ul>
      </div>
    );
  });

  return (
    <Top>
      <PageTitle>40K Enlist</PageTitle>
      <Tooltip placement="bottom" title="List View">
        <Button icon={<EyeOutlined />} shape="circle" onClick={openList} />
      </Tooltip>
      <Drawer
        title="Your List"
        placement="left"
        closable="true"
        onClose={closeList}
        visible={isOpen}
        width="100%"
        key={"left"}
      >
        {army.map((unit) => {
          return createListUnit(unit);
        })}
      </Drawer>
    </Top>
  );
}
