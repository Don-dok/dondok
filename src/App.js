import React, { useEffect, useState } from 'react';
import TheTabs from './components/common/TheTabs';
import TheHeader from './components/common/TheHeader';
import './App.css';
import { styled } from 'styled-components';
import SubTabs from './components/main/SubTabs';
import Search from 'antd/es/transfer/search';
import ChartWrpper from './components/stastics/ChartWrapper';
import User from '../src/components/user/User';
import { Skeleton } from 'antd';

function App() {
  const [activeKey, setActiveKey] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [activeKey]);

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
        <StyeldSkeletons loading={isLoading} active>
          <Components />
        </StyeldSkeletons>
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

const StyeldSkeletons = styled(Skeleton)`
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
`;
