import React, { useState, useEffect } from 'react';
import { Collapse, Tag, Card } from 'antd';
import {
  formatPrice,
  formatDate,
  getStartDateAndEndDate,
} from '../../../utils/format';
import styled from 'styled-components';
import { getSpendingCalendar } from '../../../api/requests';

const Details = ({ dateData, details, isDaily, isWeekly }) => {
  const [selectedDate, setSelectedDate] = useState(
    formatDate(new Date())?.split('-').map(Number),
  );
  const [spendingData, setSpendingData] = useState({});

  useEffect(() => {
    getSpendingData();
  }, []);

  // 소비 달력 API 호출
  const getSpendingData = async () => {
    try {
      const res = await getSpendingCalendar(selectedDate[0], selectedDate[1]);
      setSpendingData(res);
    } catch (error) {
      alert('오류가 발생했습니다.', error);
    }
  };

  // item 속성에서 출력할 일별 지출 데이터 가공
  const getListData = () => {
    let spendingList = [];
    // spending 객체 for in 반복문으로 각 key: value 접근
    for (let key in spendingData) {
      // formatDate 형식 (2023-7-10)으로 날짜 구하기
      const date = formatDate(spendingData[key][0].date);
      // 일 지출 합계
      const sum = spendingData[key].reduce(
        (acc, cur) => (acc += cur.amount),
        0,
      );
      // spendingList 배열에 객체 데이터 {2023/7/10, 2860106, data: Array} 넣기
      spendingList.push({ date, sum, data: spendingData[key] });
    }
    return spendingList;
  };

  // 컴포넌트의 item 속성에 들어갈 값 - daily일 때
  // items는 items =[{}] 형태로 들어가야 함
  const dailyItems = () => {
    const data = getListData();

    // 데이터를 최근 날짜 기준으로 sort
    return data
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .map((value, i) => {
        return {
          key: i,
          label: (
            <Container>
              <p style={{ fontWeight: 700 }}>{value.date}</p>
              <p style={{ color: '#EF6262' }}>₩ {formatPrice(value.sum)}</p>
            </Container>
          ),
          // 상세 내역
          children: value.data
            .sort((a, b) => new Date(b.date) - new Date(a._date))
            .map((value, i) => (
              <Details_Box key={i}>
                <li>
                  <Tag color="#468B97">{value.category}</Tag>
                  <p>₩{formatPrice(value.amount)}</p>
                </li>
              </Details_Box>
            )),
        };
      });
  };
  // 컴포넌트의 item 속성에 들어갈 값 - weekly

  // const weeklyItems = dateData.sort((a,b)=> new Date(b._id) - new Date(a._id)).map((value, i)=> {
  //   if (value._id) {
  //     const date = value._id.split('-').map(item => Number(item))
  //     return {
  //       key: value._id,
  //       label: (
  //         <Container >
  //           <p style={{fontWeight: 700}}>{getStartDateAndEndDate(date[0],date[1]-1)}</p>
  //           <p style={{color: '#eb2f96'}}>₩ {formatPrice(value.totalAmount)}</p>
  //         </Container>
  //       ),
  //       children: (
  //         <Details_Box>
  //           {/* eslint-disable-next-line react/prop-types */}
  //           {details.map((value, i)=>{
  //             if (value._id) {
  //               const date = value._id.split('-').map(item => Number(item))
  //               return ( <li
  //                 key={i}
  //                 style={{display: 'flex', gap: 20}}
  //                 >
  //                 <p>{getStartDateAndEndDate(date[0],date[1]-1)}</p>
  //                 <p>₩ {formatPrice(value.totalAmount)}</p>
  //               </li>
  //             )
  //             }
  //             })}
  //         </Details_Box>
  //       )
  //     }
  //   }
  // })

  // 컴포넌트의 item 속성에 들어갈 값 - monthly
  // const monthlyItems = dateData
  //   .sort((a, b) => new Date(b._id) - new Date(a._id))
  //   .map((value, i) => {
  //     return {
  //       key: value._id,
  //       label: (
  //         <Container>
  //           <p style={{ fontWeight: 700 }}>{value._id}</p>
  //           <p style={{ color: '#eb2f96' }}>
  //             ₩ {formatPrice(value.totalAmount)}
  //           </p>
  //         </Container>
  //       ),
  //       children: (
  //         <Details_Box>
  //           {/* eslint-disable-next-line react/prop-types */}
  //           {details.map((value, i) => {
  //             if (value._id) {
  //               const date = value._id.split('-').map((item) => Number(item));
  //               return (
  //                 <li key={i} style={{ display: 'flex', gap: 20 }}>
  //                   <p>{getStartDateAndEndDate(date[0], date[1] - 1)}</p>
  //                   <p>₩ {formatPrice(value.totalAmount)}</p>
  //                 </li>
  //               );
  //             }
  //           })}
  //         </Details_Box>
  //       ),
  //     };
  //   });

  // const weeklyData = dateData.map(item => {
  //     if (item._id) {
  //       const date = item._id.split('-').map(item => Number(item))
  //       item['num'] = Number(item._id.replace(/-/, ""))
  //       item['period'] = getStartDateAndEndDate(date[0], date[1] - 1)
  //       return item;
  //     }
  //      })
  // const sortedData = [...dateData].sort((a,b)=> {
  //   Number(b._id.replace(/-/,"")) - Number(a._id.replace(/-/,""))} )
  //   console.log({sortedData})

  const sortedData = [...dateData]
    .sort((a, b) => {
      if (a._id && b._id) {
        return Number(b._id.replace(/-/, '')) - Number(a._id.replace(/-/, ''));
      }
    })
    .map((item) => {
      if (item._id) {
        item['num'] = Number(item._id.replace(/-/, ''));
        return item;
      }
      return true;
    });

  console.log('sort', sortedData);

  // const diffData = sortedData.reduce((prev, cur) =>
  //   cur.num - prev.num === -1 ? prev.totalAmount - cur.totalAmount : null,
  // );
  // console.log('diff', diffData);

  const CardList = () => {
    if (isWeekly && dateData.length) {
      return sortedData.map((value, i) => {
        if (value._id) {
          const date = value._id.split('-').map((item) => Number(item));
          return (
            <StyledCard
              key={i}
              style={{
                width: 250,
              }}
            >
              <strong>{getStartDateAndEndDate(date[0], date[1] - 1)}</strong>
              <div>
                <p className="amount">₩ {formatPrice(value.totalAmount)}</p>
                <p style={{ color: '#468B97', fontSize: 12 }}>
                  전주보다 많이 쓰셨어요!
                </p>
              </div>
            </StyledCard>
          );
        }
      });
    } else if (!isWeekly && !isDaily) {
      return sortedData.map((value, i) => {
        if (value._id) {
          return (
            <StyledCard
              key={i}
              style={{
                width: 300,
              }}
            >
              <strong>{value._id}</strong>
              <div>
                <p className="amount">₩ {formatPrice(value.totalAmount)}</p>
                <p style={{ color: '#468B97', fontSize: 12 }}>
                  전월보다 많이 쓰셨어요!
                </p>
              </div>
            </StyledCard>
          );
        }
      });
    }
  };

  return isDaily ? (
    <StyledCollapse
      accordion
      // daily 일때 사용하는 API가 다르기 때문에 구분
      items={dailyItems()}
      onChange={(value) =>
        setSelectedDate(value[0]?.split('-').map((value) => Number(value)))
      }
    />
  ) : (
    <CardList />
  );
};

export default Details;

const Container = styled.div`
  color: #202e3d;
  display: flex;
  gap: 70px;
  p {
    margin: 0;
  }
`;

const Details_Box = styled.ul`
  padding: 0;
  li {
    display: flex;
    justify-content: space-between;

    p {
      margin: 0;
      font-weight: 600;
    }
  }
`;
const StyledCollapse = styled(Collapse)`
  margin: 10px;
`;

const StyledCard = styled(Card)`
  color: #202e3d;
  margin-top: 10px;
  .ant-card-body {
    padding: 10px 20px;
  }

  .amount {
    float: right;
    color: #ef6262;
  }
`;
