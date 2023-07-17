import React, { useState } from 'react';
import TotalAmountChart from './TotalAmountChart';
import TotalCategoryChart from './TotalCategoryChart';
import PeriodChart from './PeriodChart';

export default function ChartWrpper() {
  const [chartState, setChartState] = useState(<TotalAmountChart />);

  const handleChart = (e) => {
    e.preventDefault();
    if (e.target.value === 'line') {
      setChartState(<TotalAmountChart />);
    }
    if (e.target.value === 'bar') {
      setChartState(<TotalCategoryChart />);
    }
    if (e.target.value === 'period') {
      setChartState(<PeriodChart/>)
    }
  };

  return (
    <div>
      <form>
        <select onChange={handleChart}>
          <option value="line">일 지출 내역</option>
          <option value="bar">항목별 지출 내역</option>
          <option value="period">월 별 지출 내역</option>
        </select>
      </form>
      {chartState}
    </div>
  );
}
