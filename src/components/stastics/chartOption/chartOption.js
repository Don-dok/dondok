// 카테고리
export const barOptions_category = {
  borderWidh: 10,
  plugins: {
    legend: {
      display: true,
      position: "left",
    },
    title: {
      display: true,
      text: "카테고리별 지출 내역 조회",
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
      mode: "index", // 상세 정보를 표시할 때 인덱스 모드로 설정
      intersect: false, // 충돌하지 않도록 설정
    },
  },
};

export const pieOptions_category = {
  responsive: true,
  plugins: {
    legend: {
      position: "right",
      display: true,
    },
    scales: {
      y: {
        beginAtZero: true, // y 축 최소값을 0으로 설정
      },
    },
    tooltip: {
      mode: "index", // 상세 정보를 표시할 때 인덱스 모드로 설정
      intersect: false, // 충돌하지 않도록 설정
    },
  },
};

// 일자별

export const lineOptions_amount = {
  responsive: true,
  tension: 0.3, // 곡선 설정
  radius: 10, // point 크기
  plugins: {
    legend: {
      position: "left",
      display: true,
    },

    title: {
      display: true,
      text: "일별 지출 내역 조회",
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
      mode: "index", // 상세 정보를 표시할 때 인덱스 모드로 설정
      intersect: false, // 충돌하지 않도록 설정
    },
  },
};

export const pieOptions_amount = {
  responsive: true,
  plugins: {
    legend: {
      position: "right",
      // display: false,
    },
    scales: {
      y: {
        beginAtZero: true, // y 축 최소값을 0으로 설정
      },
    },
    tooltip: {
      mode: "index", // 상세 정보를 표시할 때 인덱스 모드로 설정
      intersect: false, // 충돌하지 않도록 설정
    },
  },
};
