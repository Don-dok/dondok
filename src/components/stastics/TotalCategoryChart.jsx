//////////////////////////// x축 카테고리, y축 금액 //////////////////////////////
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
              'rgba(242,80,34, .3)', // 빨
              'rgba(127,186,0, .3)', // 초
              'rgba(0,164,239, .3)', // 파
              'rgba(255,185,0, .3)', // 노
              'rgba(115,115,115, .3)', // 흑
            ],
            borderColor: [
              'rgba(242,80,34, .8)', // 빨
              'rgba(127,186,0, .8)', // 초
              'rgba(0,164,239, .8)', // 파
              'rgba(255,185,0, .8)', // 노
              'rgba(115,115,115, .8)', // 흑
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
  const handleChangeYear = (e) => {
    setYear(parseInt(e.target.value));
  };
  const handleChangeMonth = (e) => {
    setMonth(parseInt(e.target.value));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <span>
        <label htmlFor="year"> </label>
        <select id="year" value={year} onChange={handleChangeYear}>
          <option value={currentYear - 2}>{currentYear - 2}년</option>
          <option value={currentYear - 1}>{currentYear - 1}년</option>
          <option value={currentYear}>{currentYear}년</option>
          <option value={currentYear + 1}>{currentYear + 1}년</option>
          <option value={currentYear + 2}>{currentYear + 2}년</option>
        </select>
      </span>
      <span
        style={{
          marginLeft: '5px',
        }}
      >
        <label htmlFor="month"> </label>
        <select id="month" value={month} onChange={handleChangeMonth}>
          <option value={1}>1월</option>
          <option value={2}>2월</option>
          <option value={3}>3월</option>
          <option value={4}>4월</option>
          <option value={5}>5월</option>
          <option value={6}>6월</option>
          <option value={7}>7월</option>
          <option value={8}>8월</option>
          <option value={9}>9월</option>
          <option value={10}>10월</option>
          <option value={11}>11월</option>
          <option value={12}>12월</option>
        </select>
        <button onClick={fetchData}>검색</button>
      </span>
      {totalAmount ? (
        <div>총 지출 금액: {totalAmount}원</div>
      ) : (
        <div>지출 내역이 없습니다.</div>
      )}

      {data && (
        <div>
          <Bar data={data} options={barOptions_category} />
          <hr />
          <Pie data={data} options={pieOptions_category} />
        </div>
      )}
    </div>
  );
}
