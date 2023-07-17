import React, { useState } from 'react';
import { Button, Modal, Input, DatePicker } from 'antd';
import axios from 'axios';
import PropTypes from 'prop-types';
import moment from 'moment';

const CreateModal = ({ getList }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState(0);
  const [dateTime, setDateTime] = useState(
    moment().add(9, 'hours').toISOString(),
  );

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
        'http://52.78.195.183:3003/api/expenses',
        body,
        { headers: headers },
      );
      if (res) {
        setIsModalOpen(false);
        getList();
        setDateTime(moment().add(9, 'hours').toISOString());
        setCategory('');
        setAmount('');
      } else {
        alert('등록실패');
      }
    } catch (e) {
      alert('오류가 발생했습니다.', e)
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setCategory('');
    setAmount('');
  };
  const dateChangeHandler = (date) => {
    setDateTime(date.add(9, 'hour').toISOString());
  };
  const categoryChangeHandler = (e) => {
    setCategory(e.target.value);
  };

  const amountChangeHandler = (e) => {
    const { value } = e.target;
    const number = value.replace(/,/g, '');
    const formattedNumber = Number(number).toLocaleString();
    setAmount(formattedNumber);
  };

  return (
    <>
      <Button onClick={showModal}>+</Button>
      <Modal
        title="새로운 항목 추가"
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
        okText="등록하기"
        cancelText="취소"
      >
        <DatePicker
          placeholder={moment().format('YYYY-MM-DD HH:mm')}
          selected={dateTime}
          format="YYYY-MM-DD HH:mm"
          showTime
          onChange={(date) => dateChangeHandler(date)}
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

CreateModal.propTypes = {
  getList: PropTypes.func.isRequired,
};

export default CreateModal;
