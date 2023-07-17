import React from 'react';
import TheTabs from './components/common/TheTabs';
import TheHeader from './components/common/TheHeader';
import './App.css';
import { styled } from 'styled-components';
import 'reset-css';


function App() {
  return (
    <div className="App">
      <Container>
        <HeaderWrap>
          <TheHeader />
        </HeaderWrap>
        <TheTabs />
      </Container>
    </div>
  );
}

export default App;

const Container = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const HeaderWrap = styled.div `
  position: relative;
  width:100%;

`;