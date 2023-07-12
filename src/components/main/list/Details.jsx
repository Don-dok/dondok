import React from 'react'
import { Card } from 'antd';
import { formatPrice } from '../../../utils/format';

// eslint-disable-next-line react/prop-types
const Details = ({dateData}) => {
  return (
    <>
        {
      // eslint-disable-next-line react/prop-types
      dateData?.map((value, i) =>  (
        <>
        <Card 
          key={i} 
          title={value._id} 
          type='inner' 
          style={{ width: 300, margin: 10}}>
          <p>₩ {formatPrice(value.totalAmount)}</p>
        </Card>
        </>
      ))
    }
    </>

  )
}

export default Details