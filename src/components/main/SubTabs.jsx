import React from 'react';
import { ScheduleTwoTone, DatabaseTwoTone } from '@ant-design/icons';
import { Tabs } from 'antd';
import TheCalendar from './calendar/TheCalendar';
import TheList from './list/TheList';
import styled from 'styled-components';

const SubTabs = () => {
  return (
    <StyledTabs
      defaultActiveKey="1"
      style={{}}
      items={[
        {
          label: (
            <span>
              <ScheduleTwoTone twoToneColor="#adb6bd" />
              달력
            </span>
          ),
          key: '1',
          children: <TheCalendar />,
        },
        {
          label: (
            <span>
              <DatabaseTwoTone twoToneColor="#adb6bd" />
              리스트
            </span>
          ),
          key: '2',
          children: <TheList />,
        },
      ]}
    />
  );
};

export default SubTabs;

const StyledTabs = styled(Tabs)`
  .ant-tabs-nav-wrap {
    display: flex;
    justify-content: center;
  }
`;
