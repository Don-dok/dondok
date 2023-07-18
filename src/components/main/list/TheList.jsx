import React, { useCallback, useEffect, useState } from 'react';
import { lookupByDate } from '../../../api/requests';
import { Segmented, Skeleton, Space } from 'antd';
import Details from './Details';
import styled from 'styled-components';

const TheList = () => {
  const [options, setOptions] = useState(['Daily', 'Weekly', 'Monthly']);
  const [selectedDate, setSelectedDate] = useState('daily');
  const [isDaily, setIsDaily] = useState(true);
  const [isWeekly, setIsWeekly] = useState(true);
  const [daily, setDaily] = useState([]);
  const [weekly, setWeekly] = useState([]);
  const [monthly, setMonthly] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getSelectedDate();
  }, [selectedDate]);

  // selectedDate에 따라 데이터 호출
  const getSelectedDate = () => {
    setIsLoading(true);
    if (selectedDate === 'daily' || selectedDate === '') {
      lookupByDate('daily')
        .then((data) => {
          setDaily(data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else if (selectedDate === 'weekly') {
      lookupByDate('weekly')
        .then((data) => setWeekly(data))
        .finally(() => {
          setIsLoading(false);
        });
    } else if (selectedDate === 'monthly') {
      lookupByDate('monthly')
        .then((data) => setMonthly(data))
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  // selectedDate에 따라 props 변경되는 컴포넌트
  const TheDetails = () => {
    if (selectedDate === 'daily') {
      return <Details dateData={daily} isDaily={isDaily} />;
    } else if (selectedDate === 'weekly') {
      return <Details dateData={weekly} isWeekly={isWeekly} />;
    } else {
      return <Details dateData={monthly} />;
    }
  };

  return (
    <Container>
      <Space direction="vertical">
        <StyledSegmented
          options={options}
          onChange={(value) => setSelectedDate(value.toLowerCase())}
        />
      </Space>
      {isLoading ? <Skeleton isLoading={isLoading} active /> : <TheDetails />}
    </Container>
  );
};

export default TheList;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledSegmented = styled(Segmented)`
  margin-bottom: 20px;
`;
