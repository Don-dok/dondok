//////////////////////////// X축 일자, Y축 금액 //////////////////////////////
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie, Line } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
  lineOptions_amount,
  pieOptions_amount,
} from './chartOption/chartOption';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Legend,
  Tooltip,
  Filler,
  ArcElement,
} from 'chart.js';

// 차트에서 사용할 기능 등록
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
  Tooltip,
  Filler,
  ArcElement,
);

export default function TotalAmountChart() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  const [data, setData] = useState(null); // 차트 데이터
  const [totalAmount, setTotalAmount] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://52.78.195.183:3003/api/expenses/calendar?year=${year}&month=${month}&userId=Team2&includeCategory=true`,
      );

      const responseData = response.data;

      const categoryAmounts = {}; // 날짜별 카테고리별 금액 합계를 저장할 객체
      // 일자 가시성 변경 함수
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}년 ${month}월 ${day}일`;
      };

      // 토탈;
      Object.values(responseData).forEach((items) => {
        items.forEach((item) => {
          const { category, amount, date } = item;
          const formattedDate = formatDate(date);
          if (
            Object.prototype.hasOwnProperty.call(categoryAmounts, formattedDate)
          ) {
            // 이미 해당 날짜의 카테고리별 금액이 존재하면 합산하여 더함
            if (
              Object.prototype.hasOwnProperty.call(
                categoryAmounts[formattedDate],
                category,
              )
            ) {
              categoryAmounts[formattedDate][category] += amount;
            } else {
              categoryAmounts[formattedDate][category] = amount;
            }
          } else {
            // 해당 날짜의 카테고리별 금액이 없으면 새로 추가
            categoryAmounts[formattedDate] = { [category]: amount };
          }
        });
      });

      // 차트 데이터
      const chartData = {
        plugins: [ChartDataLabels],
        labels: Object.keys(categoryAmounts), // x축
        datasets: [
          {
            label: '지출 금액(₩)',
            data: Object.values(categoryAmounts).map((item) =>
              Object.values(item).reduce((acc, curr) => acc + curr, 0),
            ), // 날짜별 카테고리별 금액 합계 사용
            backgroundColor: [
              'rgba(0,164,239, .3)', // 파
              'rgba(127,186,0, .3)', // 초
              'rgba(242,80,34, .3)', // 빨
              'rgba(255,185,0, .3)', // 노
              'rgba(115,115,115, .3)', // 흑
            ],
            borderColor: [
              'rgba(0,164,239, .8)', // 파
              'rgba(127,186,0, .8)', // 초
              'rgba(242,80,34, .8)', // 빨
              'rgba(255,185,0, .8)', // 노
              'rgba(115,115,115, .8)', // 흑
            ],
            borderWidth: 3,
            fill: true, // true로 사용시 line 차트 안을 채움
          },
        ],
      };
      setData(chartData);
      // totalAmount 상태 업데이트
      const total = Object.values(categoryAmounts)
        .map((item) => Object.values(item).reduce((acc, curr) => acc + curr, 0))
        .reduce((acc, curr) => acc + curr, 0);
      setTotalAmount(total);
    } catch (error) {
      alert('오류가 발생했습니다.', error)
    }
  };
  // 이벤트 핸들러
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
        <label htmlFor="year"></label>
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
        <label htmlFor="month"></label>
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
      {totalAmount ? (
        data && (
          <div>
            <Line data={data} options={lineOptions_amount} />
            <hr />
            <Pie data={data} options={pieOptions_amount} />
          </div>
        )
      ) : (
        <h2>내역없음</h2>
      )}
    </div>
  );
}
