import { COLOR } from "@/constants";
import { FootballItem } from "@/types";
import { RectangleProps, Tooltip, Text } from "recharts";
import { XAxis, YAxis, Legend, Bar, Rectangle, BarChart } from 'recharts'

const createCustomBar = (yearlyMeanValue: number) => (props: RectangleProps) => {
  const { value } = props;

  let fill

  if (Number(value) < yearlyMeanValue) {
    fill = COLOR.RED
  } else {
    fill = COLOR.GREEN
  }


  //use explicit fill here, or use the additional css class and make a css selector to update fill there
  return <Rectangle {...props} fill={fill} />
};

export const CustomizedBarChart = ({ data, yearlyMeanValue }: { data: FootballItem[], yearlyMeanValue: number }) => {
  const CustomBar = createCustomBar(yearlyMeanValue)

  return (<BarChart width={1000} height={600} data={data}>
    <XAxis dataKey={x => x.time} />
    <YAxis dataKey={x => x.value} type="number" allowDataOverflow /> />
    <Bar shape={CustomBar} dataKey={x => x.value} />
    <Tooltip />
    <Legend payload={[{
      value: 'Above Yearly Average',
      color: COLOR.GREEN
    }, {
      value: 'Bellow Yearly Average',
      color: COLOR.RED
    }]} />
  </BarChart >)
}