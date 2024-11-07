import { COLOR } from "@/constants";
import { FootballItem } from "@/types";
import { CartesianGrid, RectangleProps, Tooltip } from "recharts";
import { XAxis, YAxis, Legend, Bar, Rectangle, BarChart, ResponsiveContainer } from 'recharts'

// any props is defined by recharts, we can't type it. We set display name when use the function
// eslint-disable-next-line react/display-name 
const createCustomBar = (yearlyAverage: number): React.FC<unknown> => (props: unknown) => {
  let fill
  const castedProps = props as RectangleProps & { value: number }
  const { value } = castedProps

  if (Number(value) < yearlyAverage) {
    fill = COLOR.RED
  } else {
    fill = COLOR.GREEN
  }


  //use explicit fill here, or use the additional css class and make a css selector to update fill there
  return <Rectangle {...castedProps} fill={fill} name="demo" />
};

export const CustomizedBarChart = ({ data, yearlyAverage }: { data: FootballItem[], yearlyAverage: number }) => {
  const CustomBar = createCustomBar(yearlyAverage)
  CustomBar.displayName = 'CustomBar'

  return (
    <ResponsiveContainer width="100%" height={600}>
      <BarChart data={data}>
        <CartesianGrid stroke={COLOR.GRID_BORDER} strokeDasharray="5 5" />
        <XAxis dataKey={x => x.time} />
        <YAxis dataKey={x => x.value} type="number" allowDataOverflow />
        <Bar shape={<CustomBar />} dataKey={x => x.value} />
        <Tooltip />
        <Legend payload={[{
          value: 'Above Yearly Average',
          color: COLOR.GREEN
        }, {
          value: `Bellow Yearly Average (${yearlyAverage})`,
          color: COLOR.RED
        }]} />
      </BarChart >
    </ResponsiveContainer>
  )
}