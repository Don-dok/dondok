import React, { useEffect, useState } from 'react';
import TheTabs from './components/common/TheTabs';
import TheHeader from './components/common/TheHeader';
import './App.css';
import { styled } from 'styled-components';
import SubTabs from './components/main/SubTabs';
import Search from './components/search/Search';
import ChartWrpper from './components/stastics/ChartWrapper';
import User from '../src/components/user/User';

function App() {
  const [activeKey, setActiveKey] = useState('');

  const Components = () => {
    if (activeKey === '1' || activeKey === '') {
      return <SubTabs />;
    } else if (activeKey === '2') {
      return <Search />;
    } else if (activeKey === '3') {
      return <ChartWrpper />;
    } else if (activeKey === '4') {
      return <User />;
    }
  };

  return (
    <div className="App">
      <TheHeader />
      <Container>
        <Components />
      </Container>
      <TheTabs activeKey={activeKey} setActiveKey={setActiveKey} />
    </div>
  );
}

export default App;

const Container = styled.section`

  box-sizing: border-box;
  margin: 50px 0;
  height: 88%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  align-items: center;

  &::-webkit-scrollbar {
    display: none;
  }
`;
