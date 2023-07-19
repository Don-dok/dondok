// 일 지출 내역별
export const lineOptions_amount = {
  responsive: true,
  tension: .4, // Line 곡선 설정
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
