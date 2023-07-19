import React, { useState } from 'react';
import styled from 'styled-components';
import TotalAmountChart from './TotalAmountChart';
import TotalCategoryChart from './TotalCategoryChart';
import PeriodChart from './PeriodChart';
import { Select } from 'antd';

const { Option } = Select;

const ChartWrapperContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 10px;
`;

export default function ChartWrapper() {
  const [chartState, setChartState] = useState(<TotalAmountChart />);

  const handleChart = (value) => {
    if (value === 'line') {
      setChartState(<TotalAmountChart />);
    }
    if (value === 'bar') {
      setChartState(<TotalCategoryChart />);
    }
    if (value === 'period') {
      setChartState(<PeriodChart />);
    }
  };

  return (
    <ChartWrapperContainer>
      <Select defaultValue="line" style={{ width: 218 }} onChange={handleChart}>
        <Option value="line">일 지출 내역</Option>
        <Option value="bar">항목별 지출 내역</Option>
        <Option value="period">월 별 지출 내역</Option>
      </Select>
      {chartState}
    </ChartWrapperContainer>
  );
}
