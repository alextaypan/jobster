import { useState } from "react";
import { useSelector } from "react-redux";
import Wrapper from "../assets/wrappers/ChartsContainer";
import AreaChartComponent from "./AreaChartComponent";
import BarChartComponent from "./BarChartComponent";

const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true);
  const { monthlyApplications: data } = useSelector((store) => store.allJobs);
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? "Area Chart" : "Bar Chart"}
      </button>
      {barChart ? (
        <BarChartComponent data={data} />
      ) : (
        <AreaChartComponent data={data} />
      )}
    </Wrapper>
  );
};
export default ChartsContainer;
