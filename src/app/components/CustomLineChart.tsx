import { COLOR } from "@/constants"
import { FootballItem } from "@/types"
import { Tooltip } from "antd"
import { LineChart, XAxis, YAxis, Line, Legend, ResponsiveContainer, CartesianGrid } from "recharts"

export const CustomLineChart = ({ data }: { data: FootballItem[] }) => {
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

          return 'Bellow Yearly Average'
        }} />
      </LineChart>
    </ResponsiveContainer>
  )
}