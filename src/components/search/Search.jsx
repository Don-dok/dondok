import {
  AutoComplete,
  List,
  Input,
  DatePicker,
  message,
  Popconfirm,
  Button,
} from 'antd';
import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import DateTimeDisplay from '../main/calendar/DateTimeDisplay';
import Loading from '../common/Loading';

const Search = () => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [list, setList] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editableIndex, setEditableIndex] = useState(null);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState(0);
  const [dateTime, setDateTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const options = suggestions.map((category, index) => ({
    value: category,
    key: `category-${index}`,
  }));
  const getList = async () => {
    try {
      const response = await fetch(
        `https://chickenlecture.xyz/api/expenses/search?q=${value}&userId=Team2`,
        {
          method: 'GET',
        },
      );

      if (!response.ok) {
        throw new Error('네트워크 응답이 올바르지 않습니다');
      }
      const res = await response.json();

      setList(
        res.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB - dateA;
        }),
      );
    } catch (error) {
      alert('오류가 발생했습니다.', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 추천 검색어
  const suggestWords = async (value) => {
    try {
      const response = await fetch(
        `https://chickenlecture.xyz/api/expenses/search?q=${value}&userId=Team2`,
        {
          method: 'GET',
        },
      );

      if (!response.ok) {
        throw new Error('네트워크 응답이 올바르지 않습니다');
      }
      const res = await response.json();
      const categorySuggestions = Array.from(
        new Set(res.map((item) => item.category)),
      ); // 중복 제거
      setSuggestions(categorySuggestions);
    } catch (error) {
      alert('오류가 발생했습니다.', error);
    } finally {
      setIsLoading(false);
    }
  };

  const pressEnterKey = async (e) => {
    if (e.key === 'Enter') {
      getList();
    }
  };

  const editHandler = async (index, item) => {
    setIsLoading(true);
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
      } catch (e) {
        console.log(e);
      }
      getList();
      setEditableIndex(null);
    } else {
      setEditableIndex(index);
      setAmount(item.amount);
      setCategory(item.category);
      setDateTime(item.date);
    }
    setEdit(!edit);
    setIsLoading(false);
  };

  const deleteHandler = async (index, id) => {
    setIsLoading(true);
    const headers = {
      'Content-Type': 'application/json',
    };
    try {
      await axios.delete(
        `https://chickenlecture.xyz/api/expenses/${id}`,
        {},
        { headers: headers },
      );
      message.success('삭제완료');
      getList();
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
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

  const onChange = (e) => {
    setValue(e);
    suggestWords(value);
  };

  return (
    <div style={{ width: '100%', marginTop: 25 }}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div>
            <AutoComplete
              value={value}
              options={options} // 제안 옵션들
              style={{ width: '80%', margin: '0 auto' }}
              placeholder="검색어를 입력하세요."
              onKeyDown={(e) => pressEnterKey(e)}
              onChange={onChange}
            />
            <Button onClick={getList}
            style={{ width: '20%' }}
            >검색</Button>
          </div>
          <div
            id="scrollableDiv"
            style={{
              height: 'auto',
              marginTop: 15,
              padding: '0 20px',
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
                      addonAfter="원"
                    />
                  </div>
                </List.Item>
              )}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Search;
