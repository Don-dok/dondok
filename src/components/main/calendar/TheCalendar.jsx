import React, { useEffect, useState } from 'react';
import { Calendar } from 'antd';
import styled from 'styled-components';
import { lookupByDate, getSpendingCalendar } from '../../../api/requests';
import { formatPrice, formatDate } from '../../../utils/format';
import ItemList from '../../calendar/ItemList';

const TheCalendar = () => {
  // getSpendingCalendar API 응답 데이터
  const [spending, setSpending] = useState({});
  // getSpendingCalendar API에 필요한 인수 - 기본값: 오늘 날짜 [2023, 7, 11]
  const [selectedDate, setSelectedDate] = useState(
    formatDate(new Date()).split('-').map(Number),
  );
  const [selectedDateDetail, setSelectedDateDetail] = useState([]);
  const [changed, setChanged] = useState(false);
  // 월별 조회 API 응답데이터
  const [monthlySpending, setMonthlySpending] = useState();
  // 소비 달력 조회 API 호출
  const getSpending = async () => {
    try {
      const res = await getSpendingCalendar(selectedDate[0], selectedDate[1]);
      setSelectedDateDetail(res[new Date().getDate()]);
      setSpending(res);
    } catch (error) {
      alert('오류가 발생했습니다.', error);
    }
  };
  // 소비항목 변경시 재렌더링을 위한 상태값변경함수
  const itemChangedHandler = async () => {
    setChanged(!changed);
  };
  // 일별, 주별, 월별 조회
  const getMonthlyData = async () => {
    try {
      const res = await lookupByDate('monthly');
      setMonthlySpending(res);
    } catch (error) {
      alert('오류가 발생했습니다.', error);
    }
  };

  // 랜더링 시 API 호출
  useEffect(() => {
    getSpending();
    getMonthlyData();
    cellRender;
  }, [changed]);

  // Calendar 컴포넌트에 출력될 데이터 API (antd)
  const cellRender = (value, info) => {
    if (info.type === 'date') return dateCellRender(value);
    if (info.type === 'month') return monthCellRender(value);
    return info.originNode;
  };

  const getDetailList = async (date) => {
    try {
      const day = formatDate(date).split('-')[2];
      setSelectedDateDetail(spending[day]);
      setSelectedDate(formatDate(date).split('-'));
    } catch (e) {
      console.log(e);
    }
  };
  // 일별 지출 합계 데이터
  const getListData = () => {
    let spendingList = [];
    // spending 객체 for in 반복문으로 각 key: value 접근
    for (let key in spending) {
      // formatDate 형식 (2023-7-10)으로 날짜 구하기
      const spendingDate = formatDate(spending[key][0].date);
      // 일 지출 합계
      const sum = spending[key].reduce((acc, cur) => (acc += cur.amount), 0);
      // spendingList 배열에 객체 데이터 {2023/7/10, 2860106} 넣기
      spendingList.push({ spendingDate, sum });
    }
    return spendingList;
  };

  // 일 지출 합계 조회 API (antd)
  const dateCellRender = (value) => {
    const listData = getListData();
    // for 반복문 index에 접근
    for (let i = 0; i < listData.length; i++) {
      // listData의 spendingDate와 value(날짜)비교
      if (listData[i].spendingDate === formatDate(value)) {
        // value 와 같은 날에 아래 p 태그 출력
        return (
          <p
            style={{
              fontSize: 8,
              marginTop: 16,
              color: '#EB455F',
              wordBreak: 'break-all', // 너비보다 글자가 긴 경우, 줄바꿈
              lineHeight: 1,
            }}
          >
            ₩ {formatPrice(listData[i].sum)}
          </p>
        );
      }
    }
  };

  // 월별 지출 데이터
  const getMonthData = (value) => {
    for (let i = 0; i < monthlySpending.length; i++) {
      // monthlySpending 데이터 해당 월에 지출액 출력
      if (monthlySpending[i]._id === value.format('YYYY-MM')) {
        return formatPrice(monthlySpending[i].totalAmount);
      }
    }
  };

  // 월별 지출 조회 API (antd)
  const monthCellRender = (value) => {
    // 해당 월 totalamount
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <span style={{ color: '#EB455F' }}>₩ {num}</span>
      </div>
    ) : null;
  };
  return (
    <>
      <StyledCalender
        cellRender={cellRender}
        onSelect={(date) => getDetailList(date)}
      />
      <ItemList
        listDetail={selectedDateDetail}
        itemChangedHandler={itemChangedHandler}
      />
    </>
  );
};

export default TheCalendar;

const StyledCalender = styled(Calendar)`
  width: 400px;
  font-size: 12px;

  .ant-picker-calendar-header {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .ant-picker-cell-inner.ant-picker-calendar-date {
    padding: 0;
  }
  .ant-picker-calendar-date-value {
    font-size: 12px;
    height: 10px;
  }
  .ant-picker-calendar-date-content {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .events {
    margin: 0;
    padding: 0;
  }
  .ant-picker-cell {
  }
  .ant-badge.ant-badge-status {
  }

  .ant-badge-status-text {
    display: inline-block;
    font-family:
      Times,
      Times New Roman,
      Georgia,
      serif;
    margin-top: 5px;
  }

  .ant-picker-cell-in-view.ant-picker-cell-selected .ant-picker-cell-inner {
    // border-color: #35495e;
  }

  @media screen and (max-height: 800px) {
    .ant-picker-cell-inner.ant-picker-calendar-date {
      height: 70px;
      margin: 0 5px;
      padding: 0;
    }
    .ant-picker-calendar-date-value {
      font-size: 12px;
      height: 10px;
    }

    // 데이터 출력되는 태그
    .ant-picker-calendar-date-content {
      position: relative;
      height: 30px;
      p {
        position: absolute;
        top: 10px;
        margin: 0 0 0;
      }
    }
    .events {
      height: 50px;
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
      font-family:
        Times,
        Times New Roman,
        Georgia,
        serif;
      margin-top: 5px;
    }
  }
`;
