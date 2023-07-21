import React, { useState } from 'react';
import { List, Input, DatePicker, message, Popconfirm } from 'antd';
import CreateModal from './CreateModal';
import DateTimeDisplay from './DateTimeDisplay';
import axios from 'axios';
import moment from 'moment';

const ItemList = (props) => {
  const list = props.listDetail;
  if (list && list.length > 1) {
    list.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });
  }
  const [edit, setEdit] = useState(false);
  const [editableIndex, setEditableIndex] = useState(null);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState(0);
  const [dateTime, setDateTime] = useState('');

  const editHandler = async (index, item) => {
    if (edit && index === editableIndex) {
      setCategory();
      const headers = {
        'Content-Type': 'application/json',
      };
      const body = {
        amount: amount,
        userId: 'Team2',
        category: category,
        date: dateTime,
      };
      try {
        await axios.put(
          `https://chickenlecture.xyz/api/expenses/${item._id}`,
          body,
          {
            headers: headers,
          },
        );
        props.itemChangedHandler();
      } catch (e) {
        alert('오류가 발생했습니다.', e);
      }
      setEditableIndex(null);
    } else {
      setEditableIndex(index);
      setAmount(item.amount);
      setCategory(item.category);
      setDateTime(item.date);
    }
    setEdit(!edit);
  };

  const deleteHandler = async (index, id) => {
    const headers = {
      'Content-Type': 'application/json',
    };
    try {
      await axios.delete(
        `https://chickenlecture.xyz/api/expenses/${id}`,
        {},
        { headers: headers },
      );
      props.itemChangedHandler();
      message.success('삭제완료');
    } catch (e) {
      alert('오류가 발생했습니다.', e);
    }
  };
  const updateCategoryHandler = (e, index) => {
    const { value } = e.target;
    setCategory(value);
    const newList = [...list];
    newList[index].category = value;
  };

  const amountChangeHandler = (e, index) => {
    const { value } = e.target;
    const number = value.replace(/[^0-9]/g, '');
    setAmount(Number(number));
    const newList = [...list];
    newList[index].amount = Number(number);
  };
  const dateChangeHandler = (date) => {
    setDateTime(date.add(9, 'hour').toISOString());
  };

  return (
    <>
      <div
        id="scrollableDiv"
        style={{
          height: 190,

          width: 400,
          padding: '0 0 0 0px',

          borderTop: '1px solid rgba(140, 140, 140, 0.35)',
        }}
      >
        <List
          dataSource={list}
          renderItem={(item, index) => (
            <List.Item
              key={item._id}
              actions={[
                <a
                  key="list-loadmore-edit"
                  onClick={() => editHandler(index, item)}
                >
                  {edit && index === editableIndex ? '수정완료' : '수정'}
                </a>,
                <Popconfirm
                  title="정말 삭제하시겠습니까?"
                  onConfirm={() => deleteHandler(index, item._id)}
                  okText="삭제"
                  cancelText="취소"
                  key="list-loadmore-more"
                >
                  <a>삭제</a>
                </Popconfirm>,
              ]}
            >
              <List.Item.Meta
                description={
                  editableIndex === index && edit ? (
                    <DatePicker
                      placeholder={moment(item.date)
                        .add(-9, 'hours')
                        .format('YYYY-MM-DD HH:mm')}
                      selected={item.date}
                      format="YYYY-MM-DD HH:mm"
                      showTime
                      onChange={(date) => dateChangeHandler(date)}
                    />
                  ) : item.date ? (
                    <DateTimeDisplay dateTime={item.date} />
                  ) : (
                    ''
                  )
                }
                title={
                  <Input
                    value={
                      editableIndex === index && category
                        ? category
                        : item.category
                    }
                    disabled={!(edit && editableIndex === index)}
                    defaultValue={item.category}
                    onChange={(e) => updateCategoryHandler(e, index)}
                  />
                }
              />

              <div>
                <Input
                  value={
                    editableIndex === index && amount
                      ? amount
                      : Number(item.amount).toLocaleString()
                  }
                  addonAfter="원"
                  disabled={!(edit && editableIndex === index)}
                  defaultValue={`${Number(item.amount).toLocaleString()}원`}
                  onChange={(e) => amountChangeHandler(e, index)}
                />
              </div>
            </List.Item>
          )}
        />
      </div>
      <CreateModal itemChangedHandler={props.itemChangedHandler} />
    </>
  );
};

export default ItemList;
