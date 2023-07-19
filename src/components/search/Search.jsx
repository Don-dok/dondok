import {
  AutoComplete,
  List,
  Input,
  DatePicker,
  message,
  Popconfirm,
} from 'antd';
import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import DateTimeDisplay from '../calendar/DateTimeDisplay';
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

  const fetchSuggestions = async (inputValue) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://52.78.195.183:3003/api/expenses/search?q=${inputValue}&userId=Team2`,
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
      const categorySuggestions = Array.from(
        new Set(list.map((item) => item.category)),
      ); // 중복 제거
      setSuggestions(categorySuggestions);
    } catch (error) {
      alert('오류가 발생했습니다.', error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log(list);

  const options = suggestions.map((category, index) => ({
    value: category,
    key: `category-${index}`,
  }));

  const onSelect = (selectedValue) => {
    setValue(selectedValue);
  };

  const pressEnterKey = (e) => {
    if (e.key === 'Enter') {
      fetchSuggestions(value);
      console.log(value);
    }
  };

  const onChange = (inputValue) => {
    setValue(inputValue);
    // fetchSuggestions(inputValue);
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
          `http://52.78.195.183:3003/api/expenses/${item._id}`,
          body,
          { headers: headers },
        );
      } catch (e) {
        console.log(e);
      }
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
        `http://52.78.195.183:3003/api/expenses/${id}`,
        {},
        { headers: headers },
      );
      message.success('삭제완료');
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
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <AutoComplete
            value={value} // 입력 값
            options={options} // 제안 옵션들
            style={{ width: 200 }}
            onSelect={onSelect} // 제안 옵션 선택 시 호출되는 핸들러
            onSearch={onChange} // 입력 값 변경 시 호출되는 핸들러
            placeholder="검색어를 입력하세요."
            onKeyDown={(e) => pressEnterKey(e)}
          />
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
        </>
      )}
    </div>
  );
};

export default Search;
