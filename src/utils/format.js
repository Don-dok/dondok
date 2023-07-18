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
  const date = new Date(year, 0, 1); // 연도의 1월 1일로 설정
  const day = date.getDay(); // 1월 1일의 요일 (0: 일요일, 1: 월요일, ..., 6: 토요일)

  // 주차의 첫 번째 날짜 계산
  const startOfWeek = 7 - (day - 1); // 1월 1일이 속한 주의 첫 번째 날짜
  const firstWeekStart = startOfWeek + 7 * (week - 1);
  const firstWeekStartDate = new Date(year, 0, firstWeekStart);

  // 주차의 마지막 날짜 계산
  const lastWeekStart = startOfWeek + 7 * week - 1;
  const lastWeekStartDate = new Date(year, 0, lastWeekStart);

  return formatDate(firstWeekStartDate) + ' ~ ' + formatDate(lastWeekStartDate);
}
export { formatPrice, formatDate, getStartDateAndEndDate };
