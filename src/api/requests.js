import axios from 'axios';
const BASE_URL = 'http://52.78.195.183:3003/api/expenses';

// 일별, 주별, 월별 소비 조회
const lookupByDate = async (period) => {
  const res = await axios.get(
    `${BASE_URL}/summary?period=${period}&userId=Team2`,
  );
  if (res.status === 200) {
    return res.data;
  } else return false;
};

// 소비 기록 달력 호출
const getSpendingCalendar = async (year, month) => {
  const res = await axios.get(
    `${BASE_URL}/calendar?year=${year}&month=${month}&userId=Team2`,
  );
  if (res.status === 200) {
    return res.data;
  } else return false;
};

export { lookupByDate, getSpendingCalendar };
