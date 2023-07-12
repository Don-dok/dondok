import React, { useState } from "react";
import TotalAmountChart from "./TotalAmountChart";
import TotalCategoryChart from "./TotalCategoryChart";

export default function ChartWrpper() {
  const [chartState, setChartState] = useState(<TotalAmountChart />);

  const handleChart = (e) => {
    e.preventDefault();
    if (e.target.value === "line") {
      setChartState(<TotalAmountChart />);
    }
    if (e.target.value === "bar") {
      setChartState(<TotalCategoryChart />);
    }
  };

  return (
    <div>
      <form>
        <select onChange={handleChart}>
          <option value="line">일별 지출 내역</option>
          <option value="bar">카테고리별 지출 내역</option>
        </select>
      </form>
      {chartState}
    </div>
  );
}
