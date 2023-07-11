import React, { useEffect, useState } from 'react';
import { Calendar } from 'antd'
import styled from 'styled-components'
import { lookupByDate, getSpendingCalendar } from '../../api/requests';
import { formatPrice, formatDate } from '../../utils/format';




const TheCalendar = () => {
  // getSpendingCalendar API 응답 데이터
const [spending, setSpending] = useState({});
// getSpendingCalendar API에 필요한 인수 (기본값: 오늘 날짜)
const [selectedDate, setSelectedDate] = useState(formatDate(new Date()).split('/').map(Number));



  // 소비 달력 조회 API 호출
  const getSpending = async() => {
    try {
      const res = await getSpendingCalendar(selectedDate[0], selectedDate[1], 'Team2');
      setSpending(res);
      console.log('소비달력핸들러',res);
    } catch (error) {
      console.log('소비달력실패', error)
    }
  }

  // 랜더링 시 API 호출
  useEffect(()=>{
    getSpending();
    lookupByDate('weekly');
  },[])

  // Calendar 컴포넌트에 출력될 데이터 API (antd)
  const cellRender = (value, info) => {
    if (info.type === 'date') return dateCellRender(value);
    if (info.type === 'month') return monthCellRender(value);
    return info.originNode;
  };


  // 날짜별 지출 합계 구하기
  const getListData = () => {
    let spendingList = [];
    // spending 객체 for in 반복문으로 각 key: value 접근
    for (let key in spending) {
      // formatDate 형식 (2023/7/10) date 구하기 
        const spendingDate = formatDate(spending[key][0].date)
        // 일 지출 합계
        const sum = spending[key].reduce((acc, cur)=> acc += cur.amount,0)
        // spendingList 배열에 객체 데이터 {2023/7/10, 2860106} 넣기
        spendingList.push({spendingDate, sum})
    }
    return spendingList;
  };
  
  // 일 지출 합계 출력 
  const dateCellRender = (value) => {
    const listData = getListData();
    // listData 각 index에 접근
    for (let i = 0; i < listData.length; i++) {
      // listData와 value 날짜 비교
      if (listData[i].spendingDate ===formatDate(value)) {
        return <p 
          style={{
            fontSize: 8, 
            marginTop: 16, 
            color: '#fc037b', 
            wordBreak:'break-all', // 너비보다 글자가 긴 경우, 줄바꿈
            lineHeight: 1,
          }}>₩ {formatPrice(listData[i].sum)}</p>
      }
    }
  };

  const getMonthData = (value) => {
    if (value.month() === 7) {
      return 1394;
    }
  };
  
  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  return (
  <Container>
    <StyledCalender 
      cellRender={cellRender}
      onSelect={(date)=> { 
        setSelectedDate(formatDate(date).split('/'))
      }}
      />
  </Container>
  )
};

export default TheCalendar;

const Container = styled.div`
  background-color: aqua;
  width: 430px;
  height: 932px;
  display: flex;
  flex-direction: column;
  align-items: center;

`
const StyledCalender = styled(Calendar)`
  width: 420px;
  height: 40%;
  font-size: 12px;

  .ant-picker-calendar-header {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .ant-picker-cell-inner.ant-picker-calendar-date{
    height: 50px;
    margin: 0 5px;
    padding: 0;
  }
  .ant-picker-calendar-date-value {
    font-size: 12px;
    height: 10px;
  }
  .ant-picker-calendar-date-content {
    height: 50px;
    display: flex;
    justify-content: center;

  }
  .events {
    margin: 0;
    padding: 0;
       
  }
  .ant-picker-cell {
    overflow: hidden; 
  }
  .ant-badge.ant-badge-status {
 
  }

  .ant-badge-status-text {
  display: inline-block;
  font-family: Times, Times New Roman, Georgia, serif;
  margin-top: 5px;
  }

  .ant-picker-cell-in-view.ant-picker-cell-selected .ant-picker-cell-inner {
    border-color: #35495e;
  }

`

