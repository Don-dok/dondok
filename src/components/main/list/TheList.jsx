import React, { useEffect, useState } from 'react'
import { lookupByDate } from '../../../api/requests'
import { Segmented, Space } from 'antd';
import Details from './Details';
import styled from 'styled-components'

const TheList = () => {
  const [options, setOptions] = useState(['Daily', 'Weekly', 'Monthly']);
  const [selectedDate, setSelectedDate] = useState('daily');
  const [isDaily, setIsDaily] = useState(true);
  const [isWeekly, setIsWeekly] = useState(true);
  const [daily, setDaily] = useState([]);
  const [weekly, setWeekly] = useState([]);
  const [monthly, setMonthly] = useState([]);


  useEffect(()=>{
    getSelectedDate();
  },[selectedDate])


  // selectedDate에 따라 데이터 호출
  const getSelectedDate = () => {
    lookupByDate('daily').then(data => setDaily(data));
    lookupByDate('weekly').then(data => setWeekly(data));
    lookupByDate('monthly').then(data => setMonthly(data));
  };

// selectedDate에 따라 props 변경되는 컴포넌트
  const TheDetails = () => {
    if (selectedDate === 'daily') {
      return <Details dateData={daily} details={daily} isDaily={isDaily}/>
    } else if (selectedDate === 'weekly') {
      return <Details dateData={weekly} details={daily} isWeekly={isWeekly}/>
    } else {
      return <Details dateData={monthly} details={weekly}/>
    }
  }
  return (
    <Container>
    <Space direction="vertical">
      <Segmented 
        options={options} 
        onChange={(value)=> setSelectedDate(value.toLowerCase())}
        />
    </Space>
    <TheDetails />
    </Container>


  );
};


export default TheList

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`