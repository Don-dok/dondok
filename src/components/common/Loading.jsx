import React from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';
import { DollarTwoTone } from '@ant-design/icons';

const Loading = () => {
  return (
    <Container>
      <StyledSpin
        delay={500}
        indicator={
          <DollarTwoTone style={{ fontSize: 30 }} twoToneColor="#e57e25" spin />
        }
      />
    </Container>
  );
};

export default Loading;

const Container = styled.div`
  width: 100%;
  position: relative;
`;
const StyledSpin = styled(Spin)`
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  padding: 200px 0 0;
`;
