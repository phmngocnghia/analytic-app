import { Tooltip } from "recharts";
import { CartesianGrid, XAxis, YAxis, Legend, Bar, Rectangle, LineChart, CartesianGridProps, Line, BarChart } from 'recharts'

const createCustomBar = (yearlyMeanValue) => (props) => {
  const { value } = props;

  let fill

  if (Number(value) < yearlyMeanValue) {
    fill = '#FF7777'
  } else {
    fill = '#399918'
  }


  //use explicit fill here, or use the additional css class and make a css selector to update fill there
  return <Rectangle {...props} fill={fill} />
};

export const CustomizedBarChart = ({ data, yearlyMeanValue }) => {

  const CustomBar = createCustomBar(yearlyMeanValue)

  return (<BarChart width={1000} height={500} data={data}>
    <XAxis dataKey={x => x.time} />
    <YAxis dataKey={x => x.value} type="number" allowDataOverflow /> />
    <Bar shape={CustomBar} dataKey={x => x.value} />
    <Legend />
    <Tooltip />
  </BarChart >)
}