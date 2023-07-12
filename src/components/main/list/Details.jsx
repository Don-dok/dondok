import React, { useState, useEffect } from 'react'
import { Collapse } from 'antd';
import { formatPrice, formatDate } from '../../../utils/format';
import styled from 'styled-components'
import { getSpendingCalendar } from '../../../api/requests';



// eslint-disable-next-line react/prop-types
const Details = ({dateData, details, isDaily}) => {
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date())?.split('-').map(Number))
  const [spendingData, setSpendingData] = useState({})
  // console.log('선택데이터',selectedDate)

  useEffect(() => {
    getSpendingData();
  },[])


  const getSpendingData = async () => {
    try {
      const res = await getSpendingCalendar(selectedDate[0], selectedDate[1]);
      setSpendingData(res);
      console.log('리스트 상세정보 성공',res);
    } catch (error) {
      console.log('리스트 상세정보 실패', error);
    }
  }
  const getListData = () => {
    let spendingList = [];
    // spending 객체 for in 반복문으로 각 key: value 접근
    for (let key in spendingData) {
      // formatDate 형식 (2023-7-10)으로 날짜 구하기 
        const date = formatDate(spendingData[key][0].date)
        // 일 지출 합계
        const sum = spendingData[key].reduce((acc, cur)=> acc += cur.amount,0)
        // spendingList 배열에 객체 데이터 {2023/7/10, 2860106} 넣기
        spendingList.push({date, sum, data: spendingData[key]})
    }
    return spendingList;
  };

const dailyItems = () => {
const data = getListData();
console.log(data);

return data.sort((a,b)=> new Date(b.date) - new Date(a.date)).map((value, i)=> {return {
  key: i,
  label: (
    <Container>
      <p style={{fontWeight: 700}}>{value.date}</p>
      <p style={{color: '#eb2f96'}}>₩ {formatPrice(value.sum)}</p>
    </Container>
  ),
  children: (
    value.data.sort((a,b)=> new Date(b.date) - new Date(a._date)).map((value, i)=>(
      <Container key={i}>
        <li>
          <p>{value.category}</p>
          <p>₩{formatPrice(value.amount)}</p>
        </li>
      </Container>
    ))
  )

}})

}
  // eslint-disable-next-line react/prop-types
  const items = dateData.sort((a,b)=> new Date(b._id) - new Date(a._id)).map((value, i)=> {
    return {
      key: value._id,
      label: (
        <Container >
          <p style={{fontWeight: 700}}>{value._id}</p>
          <p style={{color: '#eb2f96'}}>₩ {formatPrice(value.totalAmount)}</p>
        </Container>
      ),
      children: (
        <ul>
          {/* eslint-disable-next-line react/prop-types */}
          {details.map((value, i)=>(
            <li 
              key={i}
              style={{display: 'flex', gap: 20}}
              >
              <p>{value._id}</p>
              <p>₩ {formatPrice(value.totalAmount)}</p>
            </li>

          ))}
        </ul>
      )
    }
  })


  return (
    <>
        {
          <Collapse 
            accordion 
            items={isDaily? dailyItems() : items }
            onChange={(value)=> setSelectedDate(value[0]?.split('-').map(value=> Number(value)))}
            />
    }
    </>

  )
}

export default Details

const Container = styled.div`
  display: flex;

  gap: 70px;
  p {
    margin: 0;
  }
`