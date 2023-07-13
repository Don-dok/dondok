import React from 'react';
import { Tabs } from 'antd';
import SubTabs from '../main/SubTabs';
import {
  DollarOutlined,
  BarChartOutlined,
  SearchOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import Circle from '../stastics/ChartWrapper';
import User from '../user/User';
import Search from '../search/Search';
import { styled } from 'styled-components';
const TheTabs = () => {
  return (
    <StyledTabs
      tabPosition="bottom"
      size="large"
      items={[
        {
          label: (
            <span>
              <DollarOutlined />
            </span>
          ),
          key: '1',
          children: <SubTabs />,
        },
        {
          label: (
            <span>
              <SearchOutlined />
            </span>
          ),
          key: '2',
          children: <Search />,
        },
        {
          label: (
            <span>
              <BarChartOutlined />
            </span>
          ),
          key: '3',
          children: <Circle />,
        },
        {
          label: (
            <span>
              <SmileOutlined />
            </span>
          ),
          key: '4',
          children: <User />,
        },
      ]}
    />
  );
};

export default TheTabs;

const StyledTabs = styled(Tabs)`
  position: absolute;
  bottom: 0;
  width: 430px;
  display: flex;
  justify-content: space-around;

  .ant-tabs-nav-list {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
  }
  .ant-tabs-tab {
    // width: 50%;
    justify-content: center;
    margin: 0 0 0 10px;
  }
`;
