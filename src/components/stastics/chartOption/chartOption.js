// 일 지출 내역별
export const lineOptions_amount = {
  responsive: true,
  tension: 0.4, // Line 곡선 설정
  radius: 2.5, // point 크기
  plugins: {
    legend: {
      position: 'top',
      display: false,
    },
    title: {
      display: true,
      text: '일별 지출 내역 조회',
      font: {
        size: 20,
      },
    },
    scales: {
      y: {
        beginAtZero: true, // y 축 최소값을 0으로 설정
      },
    },
    tooltip: {
      mode: 'index', // 상세 정보를 표시할 때 인덱스 모드로 설정
      intersect: false, // 충돌하지 않도록 설정
    },
  },
};

export const pieOptions_amount = {
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
      display: true,
    },
    scales: {
      y: {
        beginAtZero: true, // y 축 최소값을 0으로 설정
      },
    },
    tooltip: {
      mode: 'index', // 상세 정보를 표시할 때 인덱스 모드로 설정
      intersect: false, // 충돌하지 않도록 설정
    },
  },
};

// 카테고리 별
export const barOptions_category = {
  borderWidth: 10,
  plugins: {
    legend: {
      display: false,
      position: 'left',
    },
    title: {
      display: true,
      text: '카테고리별 지출 내역 조회',
      font: {
        size: 20,
      },
    },
    scales: {
      y: {
        beginAtZero: true, // y 축 최소값을 0으로 설정
      },
    },
    tooltip: {
      mode: 'index', // 상세 정보를 표시할 때 인덱스 모드로 설정
      intersect: false, // 충돌하지 않도록 설정
    },
  },
};

export const pieOptions_category = {
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
      display: true,
    },
    scales: {
      y: {
        beginAtZero: true, // y 축 최소값을 0으로 설정
      },
    },
    tooltip: {
      mode: 'index', // 상세 정보를 표시할 때 인덱스 모드로 설정
      intersect: false, // 충돌하지 않도록 설정
    },
  },
};

// 월 별 지출 내역
export const barOptions_period = {
  borderWidth: 3,
  plugins: {
    legend: {
      position: 'top',
      display: false,
    },
    title: {
      display: true,
      text: '전체 달 지출 내역',
      font: {
        size: 20,
      },
    },
    scales: {
      y: {
        beginAtZero: true, // y 축 최소값을 0으로 설정
      },
    },
    tooltip: {
      mode: 'index', // 상세 정보를 표시할 때 인덱스 모드로 설정
      intersect: false, // 충돌하지 않도록 설정
    },
  },
};

export const pieOptions_period = {
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
      // display: false,
    },
    scales: {
      y: {
        beginAtZero: true, // y 축 최소값을 0으로 설정
      },
    },
    tooltip: {
      mode: 'index', // 상세 정보를 표시할 때 인덱스 모드로 설정
      intersect: false, // 충돌하지 않도록 설정
    },
  },
};

// y축(금액) 커질시 가독성 해결 함수
export const bigAmountOptions = {
  scales: {
    y: {
      ticks: {
        callback: function (value) {
          if (value >= 100000000) {
            // 1억 이상일 경우 'x.x억' 형식으로 표기 후 floor로 소수점 버림
            const abbreviated = Math.floor((value / 100000000).toFixed(1)).toLocaleString() + '억원'; 
            return abbreviated;
          }
          // 1만 이상일 경우 'x.x만' 형식으로 표기 후 floor로 소수점 버림
          if (value >= 10000) {
            const abbreviated = Math.floor((value / 10000).toFixed(1)).toLocaleString() + '만 (원)' ; 
            return abbreviated;
          }
          // 1만 미만은 일반적인 형식으로 표기
          return value.toLocaleString() + ' (원)'; 
        },
      },
    },
  },
};