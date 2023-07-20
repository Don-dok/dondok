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
import TabPane from 'antd/es/tabs/TabPane';

const TheTabs = ({ setActiveKey }) => {
  return (
    <StyledTabs
      tabPosition="bottom"
      onChange={(activeKey) => {
        setActiveKey(activeKey);
      }}
      size="large"
      items={[
        {
          label: (
            <span>
              <DollarOutlined />
            </span>
          ),
          key: '1',
        },
        {
          label: (
            <span>
              <SearchOutlined />
            </span>
          ),
          key: '2',
        },
        {
          label: (
            <span>
              <BarChartOutlined />
            </span>
          ),
          key: '3',
        },
        {
          label: (
            <span>
              <SmileOutlined />
            </span>
          ),
          key: '4',
        },
      ]}
    />
  );
};

export default TheTabs;

const StyledTabs = styled(Tabs)`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  background-color: #fff;
  .ant-tabs-nav-list {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
  }

  .ant-tabs-nav{
    margin:0;
  }
  .ant-tabs-tab {
    // width: 50%;
    justify-content: center;
    margin: 0 0 0 10px;
  }
`;
