import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import {
  barOptions_period,
  pieOptions_period,
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

export default function PeriodChart() {
  const [selectYear, setSelectYear] = useState(new Date().getFullYear());
  const [totalAmount, setTotalAmount] = useState(0);
  const [data, setData] = useState(null);

  const currentYear = new Date().getFullYear();

  const fetchPeriodSummary = async () => {
    try {
      const response = await axios.get(
        `http://52.78.195.183:3003/api/expenses/summary?period=monthly&userId=Team2`,
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
            label: '지출 금액(₩)',
            data: amount,
            backgroundColor: [
              'rgba(0,164,239, .3)', // 파
              'rgba(127,186,0, .3)', // 초
              'rgba(242,80,34, .3)', // 빨
              'rgba(255,185,0, .3)', // 노
              'rgba(115,115,115, .3)', // 흑
            ],
            borderColor: [
              'rgba(0,164,239, .3)', // 파
              'rgba(127,186,0, .3)', // 초
              'rgba(242,80,34, .3)', // 빨
              'rgba(255,185,0, .3)', // 노
              'rgba(115,115,115, .3)', // 흑
            ],
            borderWidth: 3,
            fill: true,
          },
        ],
      };
      // 총 amount 저장
      let totalAmountSum = amount.reduce((acc, cur) => acc + cur, 0);
      setData(chartData);
      setTotalAmount(totalAmountSum);
      console.log(amount);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPeriodSummary(); // 페이지 로드 시에 소비 요약 데이터 요청
  }, [totalAmount]);

  const handleYearChange = (e) => {
    setSelectYear(parseInt(e.target.value));
  };

  return (
    <div>
      <label htmlFor="year">연도 선택</label>
      <select id="year" value={selectYear} onChange={handleYearChange}>
        <option value={currentYear - 2}>{currentYear - 2}</option>
        <option value={currentYear - 1}>{currentYear - 1}</option>
        <option value={currentYear}>{currentYear}</option>
        <option value={currentYear + 1}>{currentYear + 1}</option>
        <option value={currentYear + 2}>{currentYear + 2}</option>
      </select>
      <button onClick={fetchPeriodSummary}>검색</button>
      {totalAmount && data ? (
        <div>
          <div>총 지출 금액: {totalAmount}원</div>
          {data ? <Bar data={data} options={barOptions_period} /> : null}
          {data ? <Pie data={data} options={pieOptions_period} /> : null}
        </div>
      ) : (
        <h1>지출 내역이 없습니다.</h1>
      )}
    </div>
  );
}
