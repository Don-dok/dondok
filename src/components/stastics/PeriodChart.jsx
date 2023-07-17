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
  const [totalAmount, setTotalAmount] = useState(0);
  const [data, setData] = useState(null); // 차트 상태

  const fetchPeriodSummary = async () => {
    try {
      const response = await axios.get(
        `http://52.78.195.183:3003/api/expenses/summary?period=monthly&userId=Team2`,
      );
      const responseData = response.data;

      const sortPeriodData = responseData.sort((a, b) => {
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

      let totalAmountSum = 0; // 총합을 저장할 변수를 초기화합니다.
      responseData.forEach((item) => {
        totalAmountSum += item.totalAmount; // totalAmount를 더합니다.
      });
      setData(chartData);
      setTotalAmount(totalAmountSum);
    } catch (error) {
      alert('오류가 발생했습니다.', error)
    }
  };

  useEffect(() => {
    fetchPeriodSummary(); // 페이지 로드 시에 소비 요약 데이터 요청
  }, []);

  return (
    <div>
      {totalAmount ? (
        <div>총 지출 금액: {totalAmount}원</div>
      ) : (
        <div>지출 내역이 없습니다.</div>
      )}
      <button onClick={fetchPeriodSummary}>새로고침</button>
      {data ? <Bar data={data} options={barOptions_period} /> : null}
      <hr />
      {data ? <Pie data={data} options={pieOptions_period} /> : null}
    </div>
  );
}
