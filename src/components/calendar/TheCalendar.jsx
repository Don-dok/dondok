import React, { useEffect } from 'react';
import { Calendar, Badge } from 'antd'
import styled from 'styled-components'
import { postSpending,getSpendingCalendar, lookupByDate } from '../../api/requests';
const getListData = (value) => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        {
          type: 'warning',
          content: '6,000',
        },

      ];
      break;
    case 10:
      listData = [
        {
          type: 'warning',
          content: '100',
        },
      ];
      break;
    case 15:
      listData = [
        {
          type: 'warning',
          content: '1,000',
        }
      ];
      break;
    default:
  }
  return listData || [];
};
const getMonthData = (value) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const TheCalendar = () => {
  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };
  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };
  const cellRender = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };

  useEffect(()=>{
    lookupByDate('daily', 'Team2')
    getSpendingCalendar(2, 2, 'Team2');

  },[])
  return (
  <Container>
    <StyledCalender cellRender={cellRender}/>
    <button onClick={()=>postSpending()}>등록test</button>
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
  width: 390px;
  height: 40%;
  font-size: 12px;

  .ant-picker-calendar-header {
    display: flex;
    justify-content: center;
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
`
