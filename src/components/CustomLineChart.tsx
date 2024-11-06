import { COLOR } from "@/constants"
import { FootballItem } from "@/types"
import { Tooltip } from "antd"
import { LineChart, XAxis, YAxis, Line } from "recharts"

export const CustomLineChart = ({ data }: { data: FootballItem[] }) => {
  return (<LineChart width={1000} height={500} data={data}
    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
    <XAxis label="Time" dataKey={x => x.time} />
    <YAxis label="Value" dataKey={x => x.value} />
    <Tooltip />
    <Line dataKey={x => x.value} stroke={COLOR.GREEN} isAnimationActive={false} />
    <Line dataKey={x => x.lineRedValue} stroke={COLOR.RED} isAnimationActive={false} />
  </LineChart>)
}