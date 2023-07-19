// 항목별 지출 내역 컴포넌트 (x축 카테고리, y축 금액)
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import {
  barOptions_category,
  pieOptions_category,
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
import './TotalCategoryChart.css';

export default function TotalCategoryChart() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  const [data, setData] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0); // totalAmount 상태 추가

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://52.78.195.183:3003/api/expenses/calendar?year=${year}&month=${month}&userId=Team2&includeCategory=true`,
      );

      const responseData = response.data;

      // 응답 데이터의 배열을 순회하며 카테고리와 금액 정보 추출
      const categoryAmounts = {}; // 카테고리별 금액 합계를 저장할 객체

      Object.values(responseData).forEach((items) => {
        items.forEach((item) => {
          const { category, amount } = item;
          if (Object.prototype.hasOwnProperty.call(categoryAmounts, category)) {
            // 이미 해당 카테고리의 금액이 존재하면 합산하여 더함
            categoryAmounts[category] += amount;
          } else {
            // 해당 카테고리의 금액이 없으면 새로 추가
            categoryAmounts[category] = amount;
          }
        });
      });

      // 차트 데이터
      const chartData = {
        labels: Object.keys(categoryAmounts), // x축
        datasets: [
          {
            fill: true,
            label: '지출 금액(₩)',
            data: Object.values(categoryAmounts), // 카테고리별 금액 합계 사용
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
      setData(chartData);

      const total = Object.values(categoryAmounts).reduce(
        (acc, curr) => acc + curr,
        0,
      );
      setTotalAmount(total); // totalAmount 상태 업데이트
    } catch (error) {
      console.log(error);
    }
  };

  //  핸들러
  const handleChangeYear = (value) => {
    setYear(parseInt(value));
  };
  const handleChangeMonth = (value) => {
    setMonth(parseInt(value));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="total-category-chart-container">
      <div className="chart-controls">
        <label htmlFor="year"> </label>
        <Select id="year" value={year} onChange={handleChangeYear}>
          <Option value={currentYear - 3}>{currentYear - 3}년</Option>
          <Option value={currentYear - 2}>{currentYear - 2}년</Option>
          <Option value={currentYear - 1}>{currentYear - 1}년</Option>
          <Option value={currentYear}>{currentYear}년</Option>
          <Option value={currentYear + 1}>{currentYear + 1}년</Option>
          <Option value={currentYear + 2}>{currentYear + 2}년</Option>
          <Option value={currentYear + 3}>{currentYear + 3}년</Option>
        </Select>
        <label htmlFor="month"> </label>
        <Select id="month" value={month} onChange={handleChangeMonth}>
          <Option value={1}>1월</Option>
          <Option value={2}>2월</Option>
          <Option value={3}>3월</Option>
          <Option value={4}>4월</Option>
          <Option value={5}>5월</Option>
          <Option value={6}>6월</Option>
          <Option value={7}>7월</Option>
          <Option value={8}>8월</Option>
          <Option value={9}>9월</Option>
          <Option value={10}>10월</Option>
          <Option value={11}>11월</Option>
          <Option value={12}>12월</Option>
        </Select>
        <Button
          onClick={fetchData}
          style={{ backgroundColor: '#35495e', color: 'white' }}
        >
          검색
        </Button>
      </div>
      {totalAmount && data ? (
        <div className="chart-wrapper">
          <div className="total-amount">
            총 지출 금액: {totalAmount.toLocaleString()}원
          </div>
          <Bar
            data={data}
            options={barOptions_category}
            style={{
              position: 'relative',
              margin: 'auto',
              width: '420px',
              height: '100%',
            }}
          />
          <Pie
            data={data}
            options={pieOptions_category}
            style={{
              position: 'relative',
              margin: 'auto',
              width: '400px',
              height: '400px',
            }}
          />
        </div>
      ) : (
        <h1>지출 내역이 없습니다.</h1>
      )}
    </div>
  );
}
