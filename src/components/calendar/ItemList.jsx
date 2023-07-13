import React, { useEffect, useState } from 'react';
import { List, Input, DatePicker, message, Popconfirm } from 'antd';
import CreateModal from './CreateModal';
import DateTimeDisplay from './DateTimeDisplay';
import axios from 'axios';
import moment from 'moment';

const ItemList = () => {
  const [loading, setLoading] = useState(false); // 추가로 3개씩 더 불러오기 누를때마다 loading
  const [list, setList] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editableIndex, setEditableIndex] = useState(null);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState(0);
  const [dateTime, setDateTime] = useState('');
  // 목록 불러오기
  const getList = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const headers = {
      'Content-Type': 'application/json',
    };
    try {
      const res = await axios.get(
        `http://52.78.195.183:3003/api/expenses/search?q=&userId=Team2`,
        {},
        { headers },
      );
      if (res) {
        setList(res.data);
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getList();
  }, []);

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
          `http://52.78.195.183:3003/api/expenses/${item._id}`,
          body,
          { headers: headers },
        );
      } catch (e) {
        console.log(e);
      }
      setEditableIndex(null);
      getList();
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
        `http://52.78.195.183:3003/api/expenses/${id}`,
        {},
        { headers: headers },
      );
      getList();
      message.success('삭제완료');
    } catch (e) {
      console.log(e);
    }
  };
  const updateCategoryHandler = (e, index) => {
    const { value } = e.target;
    setCategory(value);
    const newList = [...list];
    newList[index].category = value;
    setList(newList);
  };

  const amountChangeHandler = (e, index) => {
    const { value } = e.target;
    const number = value.replace(/,/g, '');
    setAmount(Number(number));
    const newList = [...list];
    newList[index].amount = Number(number);
    setList(newList);
  };
  const dateChangeHandler = (date) => {
    setDateTime(date.add(9, 'hour').toISOString());
  };

  return (
    <>
      <div
        id="scrollableDiv"
        style={{
          height: 400,
          overflow: 'auto',
          padding: '0 16px',
          border: '1px solid rgba(140, 140, 140, 0.35)',
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
              />

              <div>
                <Input
                  value={
                    editableIndex === index && amount
                      ? amount
                      : Number(item.amount).toLocaleString()
                  }
                  disabled={!(edit && editableIndex === index)}
                  defaultValue={Number(item.amount).toLocaleString()}
                  onChange={(e) => amountChangeHandler(e, index)}
                />
              </div>
            </List.Item>
          )}
        />
      </div>
      <CreateModal getList={getList} />
    </>
  );
};

export default ItemList;
