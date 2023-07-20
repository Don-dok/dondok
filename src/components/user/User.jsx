import React from 'react';
import { Card, Avatar, Menu } from 'antd';
import { GithubOutlined, RightOutlined } from '@ant-design/icons'
import styled from 'styled-components'


const { Meta } = Card;

function getItem(
  label,
  key,
  icon,
  children,
  type
){
  return {
    key,
    icon,
    children,
    label,
    type,
  }
}


const items = [
  getItem('공지사항', 'sub1',<RightOutlined />),
  getItem('개인정보관리', 'sub2', <RightOutlined />),
  getItem('FAQ', 'sub3',<RightOutlined />),
  getItem('이용약관', 'sub4', <RightOutlined />),
  getItem('계정설정', 'sub5',<RightOutlined />),
];


const StyledMenu = styled(Menu)`
  width: 400px;
  height: 350px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;


const User = () => {
  return (
    <Container>
            <Card
        hoverable
        style={{ width: 400 }}
        onClick={()=> window.open("https://github.com/Don-dok/dondok")}
        cover={
          <img
            alt="example"
            src="https://media.licdn.com/dms/image/C4E12AQEJl4mGgbLMZw/article-cover_image-shrink_720_1280/0/1579179450792?e=2147483647&v=beta&t=m5RD2BrgrDar7sl1vgh98tL5nVIyt3eBaKQrLm9c1Lw"
          />
        }
      >
        <StyledMeta
        avatar={<Avatar src="https://ih1.redbubble.net/image.3632891702.9945/st,small,845x845-pad,1000x1000,f8f8f8.jpg" />}
        title="Team2"/>
          <p>조은상, 주하림, 안태욱, 이용수</p>
          <TextBox>
            <GithubOutlined />
            <p>https://github.com/Don-dok/dondok</p>
          </TextBox>
      </Card>
      <StyledMenu mode="vertical" items={items} />
    </Container>

  );
};

export default User;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;



`
const StyledMeta = styled(Meta)`
  display: flex;
  align-items: center;
`
const TextBox = styled.div`
 color: #495057;
  display: flex;
  align-items: center;
  gap: 10px;
  p {
    color: #868e96;
    margin: 0;
  }



`