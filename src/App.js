import React from 'react';
import TheTabs from './components/common/TheTabs';
import TheHeader from './components/common/TheHeader';
import './App.css';
import { styled } from 'styled-components';
function App() {
  return (
    <div className="App">
      <Container>
        <TheHeader />
        <TheTabs />
      </Container>
    </div>
  );
}

export default App;

const Container = styled.section`
  position: relative;
  border: 1px solid #191919;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 400px;
`;
