import React, { useState } from 'react';
import TheTabs from './components/common/TheTabs';
import TheHeader from './components/common/TheHeader';
import './App.css';
import { styled } from 'styled-components';

import 'reset-css';

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
        <HeaderWrap>
          <TheHeader />
        </HeaderWrap>
        <TheTabs />
      </Container>
      <TheTabs activeKey={activeKey} setActiveKey={setActiveKey} />
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
  overflow-y: scroll;
  align-items: center;

  margin-top: 50px;
`;

const HeaderWrap = styled.div`
  position: relative;
  width: 100%;
`;
