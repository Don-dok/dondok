import React from 'react';
import styled from 'styled-components';
import { DollarTwoTone } from '@ant-design/icons';

const TheHeader = () => {
  return (
    <Header>
      <img style={{ width: 60, height: 60 }} src="/assets/dog.gif"></img>
      <div
        style={{
          fontFamily: 'Gugi',
          color: '#202E3D',
          fontSize: 20,
        }}
      >
        DonDok
      </div>
    </Header>
  );
};

export default TheHeader;

const Header = styled.section`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  top: 0;
  gap: 5px;
  z-index: 1000;
  width: 100%;

  background-color: rgba(200, 244, 255, 1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2); 

`;
