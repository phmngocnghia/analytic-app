import { FootballItem } from "@/types"
import { Tooltip } from "antd"
import { LineChart, XAxis, YAxis, Line, Legend, ResponsiveContainer, CartesianGrid } from "recharts"
import { COLOR } from "../constants"

export const CustomLineChart = ({ data, yearlyAverage }: { data: FootballItem[], yearlyAverage: number }) => {
  return (
    <ResponsiveContainer width="100%" height={600}>
      <LineChart data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey={x => x.time} />
        <YAxis dataKey={x => x.value} />
        <Tooltip />
        <CartesianGrid stroke={COLOR.GRID_BORDER} strokeDasharray="5 5" />
        <Line dataKey={x => x.value} stroke={COLOR.GREEN} isAnimationActive={false} />
        <Line dataKey={x => x.lineRedValue} stroke={COLOR.RED} isAnimationActive={false} />
        <Legend formatter={(_, entry) => {
          if (entry.color === COLOR.GREEN) {
            return 'Above Yearly Average'
          }

          return `Bellow Yearly Average (${yearlyAverage})`
        }} />
      </LineChart>
    </ResponsiveContainer>
  )
}