import React, { useState } from 'react';
import TheTabs from './components/common/TheTabs';
import TheHeader from './components/common/TheHeader';
import './App.css';
import { styled } from 'styled-components';
import SubTabs from './components/main/SubTabs';
import Search from 'antd/es/transfer/search';
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
      <Container>
        <TheHeader />
        <Components />
        <TheTabs activeKey={activeKey} setActiveKey={setActiveKey} />
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
