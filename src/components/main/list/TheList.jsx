import React, { useEffect, useMemo, useState } from 'react'
import { lookupByDate } from '../../../api/requests'
import { Segmented, Space } from 'antd';
import Details from './Details';
import styled from 'styled-components'

const TheList = () => {
  const [options, setOptions] = useState(['Daily', 'Weekly', 'Monthly']);
  const [selectedDate, setSelectedDate] = useState('daily');
  const [daily, setDaily] = useState([]);
  const [weekly, setWeekly] = useState([]);
  const [monthly, setMonthly] = useState([]);

  useEffect(()=>{
    getSelectedDate();
  },[selectedDate])

  const getSelectedDate = () => {
    lookupByDate(selectedDate).then(data => {
      if (selectedDate === 'daily') {
        setDaily(data);
        console.log('Selected daily', data);
      } else if (selectedDate === 'weekly') {
        setWeekly(data);
        console.log('Selected weekly', data);
      } else {
        setMonthly(data);
        console.log('Selected monthly', data);
      }
    }).catch(error => console.log('선택 날짜 실패', error));
  };

  const TheDetails = () => {
    if (selectedDate === 'daily') {
      return <Details dateData={daily}/>
    } else if (selectedDate === 'weekly') {
      return <Details dateData={weekly}/>
    } else {
      return <Details dateData={monthly}/>
    }
  }
  return (
    <Container>
    <Space direction="vertical">
      <Segmented 
      de
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