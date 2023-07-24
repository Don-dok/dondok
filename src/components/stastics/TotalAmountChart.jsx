// 일 지출내역 컴포넌트
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie, Line } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
  lineOptions_amount,
  pieOptions_amount,
  bigAmountOptions,
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
import Loading from '../common/Loading';

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
import { Select, Button } from 'antd';
const { Option } = Select;
import './TotalAmountChart.css';
import ChartWrapper from './ChartWrapper';

export default function TotalAmountChart() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  const [data, setData] = useState(null); // 차트 데이터
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://chickenlecture.xyz/api/expenses/calendar?year=${year}&month=${month}&userId=Team2&includeCategory=true`,
      );

      const responseData = response.data;

      const categoryAmounts = {}; // 날짜별 카테고리별 금액 합계를 저장할 객체

      // UTC 변경 함수
      const convertToKoreanTime = (date) => {
        const utcTime = date.getTime();
        const koreanTime = utcTime - 9 * 60 * 60 * 1000; // 9시간(밀리초 단위)을 뺀 한국 시간
        return new Date(koreanTime);
      };

      // 일자 가시성 변경 함수
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        const koreanTime = convertToKoreanTime(date);
        const year = koreanTime.getFullYear();
        const month = ('0' + (koreanTime.getMonth() + 1)).slice(-2);
        const day = ('0' + koreanTime.getDate()).slice(-2);
        return `${month}월 ${day}일`;
        // return `${year}년 ${month}월 ${day}일`;
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
            fill: true, // true로 사용시 line 차트 안을 채움
            label: '지출 금액(₩)',
            data: Object.values(categoryAmounts).map((item) =>
              Object.values(item).reduce((acc, curr) => acc + curr, 0),
            ), // 날짜별 카테고리별 금액 합계 사용
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
      // totalAmount 상태 업데이트
      const total = Object.values(categoryAmounts)
        .map((item) => Object.values(item).reduce((acc, curr) => acc + curr, 0))
        .reduce((acc, curr) => acc + curr, 0);
      setTotalAmount(total);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  // 이벤트 핸들러
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
    <div className="total-amount-chart-container">
      {isLoading ? <Loading /> : null}
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
          <Option value={1} className="num1">
            1월
          </Option>
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
      {!isLoading && totalAmount && data ? (
        <div className="chart-wrapper">
          <div className="total-amount">
            총 지출 금액: {totalAmount.toLocaleString()}원
          </div>
          <Line
            data={data}
            options={{ lineOptions_amount, ...bigAmountOptions }}
            style={{
              position: 'relative',
              width: '420px',
              height: '100%',
              maxWidth: '600px',
            }}
          />
          <Pie
            data={data}
            options={pieOptions_amount}
            style={{
              position: 'relative',
              width: '400px',
              height: '400px',
              maxWidth: '600px',
            }}
          />
        </div>
      ) : (
        !isLoading && <h1>지출 내역이 없습니다.</h1>
      )}
    </div>
  );
}
