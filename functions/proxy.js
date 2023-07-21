// functions/proxy.js
const axios = require('axios');

exports.handler = async function (event, context) {
  try {
    const apiURL = 'https://chickenlecture.xyz/api'; // 주어진 API 서버의 기본 URL
    const path = event.path.replace('/.netlify/functions/proxy/', ''); // 요청 경로

    // API 서버로 요청 보내기
    const response = await axios({
      method: event.httpMethod,
      url: `${apiURL}/${path}`,
      data: event.body,
      headers: event.headers,
    });

    // API 서버의 응답 반환
    return {
      statusCode: response.status,
      body: JSON.stringify(response.data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  } catch (error) {
    return {
      statusCode: error.response?.status || 500,
      body: JSON.stringify(
        error.response?.data || { message: 'Internal Server Error' },
      ),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }
};
