//////////////////////////// 월 별 지출 내역 (X축 달, Y축 지출 금액) //////////////////////////////
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import {
  barOptions_period,
  pieOptions_period,
  bigAmountOptions,
} from './chartOption/chartOption';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Legend,
  Tooltip,
  Filler,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Legend,
  Tooltip,
  Filler,
  ArcElement,
);
import { Select, Button } from 'antd';
const { Option } = Select;
import './PeriodChart.css';
export default function PeriodChart() {
  const [selectYear, setSelectYear] = useState(new Date().getFullYear());
  const [totalAmount, setTotalAmount] = useState(0);
  const [data, setData] = useState(null);

  const currentYear = new Date().getFullYear();

  const fetchPeriodSummary = async () => {
    try {
      const response = await axios.get(
        `https://chickenlecture.xyz/api/expenses/summary?period=monthly&userId=Team2`,
      );
      const responseData = response.data;

      // filter() => true인 값만 반환하니까 조건 설정
      const filterYear = responseData.filter((item) => {
        const itemYear = new Date(item._id).getFullYear();
        return itemYear === selectYear;
      });

      const sortPeriodData = filterYear.sort((a, b) => {
        let x = (a._id || '').toLowerCase(); // Check if a._id is null or undefined
        let y = (b._id || '').toLowerCase(); // Check if b._id is null or undefined
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      });

      // 차트 데이터
      const amount = sortPeriodData.map((item) => item.totalAmount);
      const date = sortPeriodData.map((item) => item._id);
      const chartData = {
        labels: date, // x축
        datasets: [
          {
            fill: true,
            label: '지출 금액(₩)',
            data: amount,
            backgroundColor: [
              // 'rgba(242,80,34, .3)', // 빨
              // 'rgba(127,186,0, .3)', // 초
              // 'rgba(0,164,239, .3)', // 파
              // 'rgba(255,185,0, .3)', // 노
              // 'rgba(115,115,115, .3)', // 흑
              'rgba(255, 154, 60, .7)', // #ff9a3c
              'rgba(21, 82, 99, .7)', // #155263
              'rgba(189, 195, 198, .7)', // #bdc3c6
              'rgba(44, 54, 93, .7)', // #2c365d
              'rgba(255, 111, 60, .7)', // #ff6f3c
              'rgba(255, 201, 60, .7)', // #ffc93c
            ],
            borderColor: [
              // 'rgba(242,80,34, .8)', // 빨
              // 'rgba(127,186,0, .8)', // 초
              // 'rgba(0,164,239, .8)', // 파
              // 'rgba(255,185,0, .8)', // 노
              // 'rgba(115,115,115, .8)', // 흑
              'rgba(255, 154, 60, .8)', // #ff9a3c
              'rgba(21, 82, 99, .8)', // #155263
              'rgba(189, 195, 198, .8)', // #bdc3c6
              'rgba(44, 54, 93, .8)', // #2c365d
              'rgba(255, 111, 60, .8)', // #ff6f3c
              'rgba(255, 201, 60, .8)', // #ffc93c
            ],
            borderWidth: 3,
          },
        ],
      };
      // 총 amount 저장
      let totalAmountSum = amount.reduce((acc, cur) => acc + cur, 0);
      setData(chartData);
      setTotalAmount(totalAmountSum);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPeriodSummary(); // 페이지 로드 시에 소비 요약 데이터 요청
  }, [totalAmount]);

  const handleYearChange = (value) => {
    setSelectYear(parseInt(value));
  };

  return (
    <div className="period-chart-container">
      <div className="chart-controls">
        <label htmlFor="year"></label>
        <Select
          id="year"
          value={selectYear}
          onChange={handleYearChange}
          style={{ width: '153px' }}
        >
          <Option value={currentYear - 3}>{currentYear - 3}년</Option>
          <Option value={currentYear - 2}>{currentYear - 2}년</Option>
          <Option value={currentYear - 1}>{currentYear - 1}년</Option>
          <Option value={currentYear}>{currentYear}년</Option>
          <Option value={currentYear + 1}>{currentYear + 1}년</Option>
          <Option value={currentYear + 2}>{currentYear + 2}년</Option>
          <Option value={currentYear + 3}>{currentYear + 3}년</Option>
        </Select>
        <Button
          onClick={fetchPeriodSummary}
          style={{ backgroundColor: '#35495e', color: 'white' }}
        >
          검색
        </Button>
      </div>
      {totalAmount && data ? (
        <div>
          <div>총 지출 금액: {totalAmount.toLocaleString()}원</div>
          {data ? <Bar data={data} options={barOptions_period} /> : null}
          {data ? <Pie data={data} options={pieOptions_period} /> : null}
        </div>
      ) : (
        <h1>지출 내역이 없습니다.</h1>
      )}
    </div>
  );
}
