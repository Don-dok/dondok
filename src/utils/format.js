const formatPrice = (target) => {
  if (target) {
    let result = target.toLocaleString('ko-KR');
    return result;
  }
};

const formatDate = (date) => {
  const dateTimeStamp = new Date(date);
  const nineHoursInMillis = 9 * 60 * 60 * 1000;
  const newTimeStamp = dateTimeStamp - nineHoursInMillis;
  const newDate = new Date(newTimeStamp);
  const year = new Date(newDate).getFullYear();
  const month = new Date(newDate).getMonth() + 1;
  const day = new Date(newDate).getDate();
  return `${year}-${month}-${day}`;
};

// 해당 주차 날짜로 바꾸기
function getStartDateAndEndDate(year, week) {
  const date = new Date(year, 0, 1); // 연도의 1월 1일로 설정, 월요일이 한 주의 시작.
  const day = date.getDay(); // 1월 1일의 요일 (0: 일요일, 1: 월요일, ..., 6: 토요일)
  const startOfWeek = day === 0 ? 1 : 8 - day;
  const targetWeekStart = startOfWeek + 7 * (week - 1);
  date.setDate(targetWeekStart);
  const endDate = new Date(date);
  endDate.setDate(endDate.getDate() + 6);

  return `${year}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ~ ${year}년 ${
    endDate.getMonth() + 1
  }월 ${endDate.getDate()}일`;
}

export { formatPrice, formatDate, getStartDateAndEndDate };
