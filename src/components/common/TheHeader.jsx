import React from 'react'
import styled from 'styled-components'
import {DollarTwoTone} from '@ant-design/icons'

const TheHeader = () => {
  return (
    <Header>
      <DollarTwoTone twoToneColor='#e57e25'/>
      <div style={{
        fontWeight: 700, 
        fontFamily: 'Pretendard-Regular',
        marginBottom: -3
        }}>DonDok</div>
    </Header>
  )
}

export default TheHeader

const Header = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  gap: 5px;
`