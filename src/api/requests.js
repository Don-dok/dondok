
import axios from 'axios'
const BASE_URL = " http://52.78.195.183:3003/api/expenses"

// 소비 기록 작성
const postSpending = async () => {
  try {
    const data = {
      amount: 100,
      userId: "Team2",
      category: "food",
      date: "2023-07-04T10:30:00.000Z"
    }
    const res = await axios.post(BASE_URL, data, {'content-type': 'application/json'});
    return console.log('소비 기록 성공', res);
  } catch (error) {
    return console.log('소비 기록 실패', error)
  }
}
// 일별, 주별, 월별 소비 조회
const lookupByDate = async (period) => {
    const res = await axios.get(`${BASE_URL}/summary?period=${period}&userId=Team2`);
    console.log('일주월별 상태', res.status);
    if (res.status === 200) {
      console.log('일별, 주별, 월별 data', res.data);
      return res.data
    } else return false;
}

// 소비 기록 달력 호출 
const getSpendingCalendar = async (year, month, userId) => {
    const res = await axios.get(`${BASE_URL}/calendar?year=${year}&month=${month}&userId=${userId}`);
    if (res.status === 200) {
      console.log('소비 기록 달력 data', res.data);
      return res.data
    } else return false;
}

export {postSpending, lookupByDate, getSpendingCalendar}