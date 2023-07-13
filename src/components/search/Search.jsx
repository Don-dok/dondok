import { AutoComplete } from 'antd';
import React, { useState } from 'react';

const Search = () => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async (inputValue) => {
    try {
      const response = await fetch(`http://52.78.195.183:3003/api/expenses/search?q=${inputValue}&userId=Team2`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('네트워크 응답이 올바르지 않습니다');
      }

      const data = await response.json();

      const categorySuggestions = Array.from(new Set(data.map((item) => item.category))); // 중복 제거
      setSuggestions(categorySuggestions);
    } catch (error) {
      console.log('에러:', error);
    }
  };

  const options = suggestions.map((category, index) => ({ value: category, key: `category-${index}` }));

  const onSelect = (selectedValue) => {
    setValue(selectedValue);
  };

  const onChange = (inputValue) => {
    setValue(inputValue);
    fetchSuggestions(inputValue);
  };

  return (
    <div>
      {/* AutoComplete 컴포넌트 */}
      <AutoComplete
        value={value} // 입력 값
        options={options} // 제안 옵션들
        style={{ width: 200 }}
        onSelect={onSelect} // 제안 옵션 선택 시 호출되는 핸들러
        onSearch={onChange} // 입력 값 변경 시 호출되는 핸들러
        placeholder="검색어를 입력하세요."
      />
    </div>
  );
};

export default Search;
