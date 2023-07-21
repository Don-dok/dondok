import React, { useState } from 'react';
import { Button, Modal, Input, DatePicker } from 'antd';
import axios from 'axios';
import PropTypes from 'prop-types';
import moment from 'moment';

const CreateModal = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState(0);
  const [dateTime, setDateTime] = useState(
    moment().add(9, 'hours').toISOString(),
  );

  const modalStyle = {
    borderRadius: '10px',
    padding: 0,
  };

  // Modal
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleSubmit = async () => {
    const number = parseInt(amount.replace(/,/g, ''));
    const headers = {
      'Content-Type': 'application/json',
    };
    const body = {
      amount: number,
      userId: 'Team2',
      category: category,
      date: dateTime,
    };
    try {
      const res = await axios.post(
        'https://chickenlecture.xyz/api/expenses',
        body,
        { headers: headers },
      );
      if (res) {
        setIsModalOpen(false);
        props.itemChangedHandler();
        setDateTime(moment().add(9, 'hours').toISOString());
        setCategory('');
        setAmount('');
      } else {
        alert('등록실패');
      }
    } catch (e) {
      alert('오류가 발생했습니다.', e);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setCategory('');
    setAmount('');
  };
  const dateChangeHandler = (date) => {
    console.log('date: ', date);
    setDateTime(date.add(9, 'hour').toISOString());
  };
  const categoryChangeHandler = (e) => {
    setCategory(e.target.value);
  };

  const amountChangeHandler = (e) => {
    const { value } = e.target;
    const number = value.replace(/[^0-9]/g, '');
    const formattedNumber = Number(number).toLocaleString();
    setAmount(formattedNumber);
  };

  return (
    <>
      <div style={{ position: 'relative',
                      width:400,
                      margin:'0 auto',
                      height:'auto', }}>
          <Button
            onClick={showModal}
            style={{ position: 'fixed', 
            bottom: '8%', 
            right: '40%',
            backgroundColor: 'rgb(200, 244, 255)', 
            borderRadius: 80, 
            width: 50, 
            height:50 ,
            fontSize: 25, 
            paddingTop:0,}}
          >
          +
        </Button>
      </div>
      <Modal
        title="새로운 항목 추가"
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
        okText="등록하기"
        cancelText="취소"
        style={modalStyle}
      >
        <DatePicker
          placeholder={moment().format('YYYY-MM-DD HH:mm')}
          selected={dateTime}
          format="YYYY-MM-DD HH:mm"
          showTime
          onChange={(date) => dateChangeHandler(date)}
          allowClear={false}
        />
        <Input
          value={category || null}
          onChange={categoryChangeHandler}
          placeholder="항목을 입력하세요"
        />
        <Input
          value={amount || null}
          onChange={amountChangeHandler}
          placeholder="금액을 입력하세요"
          disabled={category ? false : true}
        />
      </Modal>
    </>
  );
};

export default CreateModal;
