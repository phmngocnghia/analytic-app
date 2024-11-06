"use client"
import { Radio, Typography } from 'antd';
import { DatePicker, Layout, Menu } from 'antd';
import { useState } from "react";
import footballCsv from '../data/football.csv'
import { CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Rectangle, LineChart, CartesianGridProps, Line } from 'recharts'
import dayjs from 'dayjs'
import { CustomizedBarChart } from '@/components/BarChart';
import { toPercentage } from '@/utils';


const yearlyMeanValue = 600
const d = footballCsv.slice(-200).map((footballItem) => {
  return {
    time: dayjs(footballItem.Time).format('DD/MM/YYYY'), value: footballItem.Value, lineGreenValue: footballItem.Value >= yearlyMeanValue ? footballItem.Value : undefined, lineRedValue: footballItem.Value < yearlyMeanValue ? footballItem.Value : undefined
  }
})




const max = d.reduce(function (curMax, current) {

  return (curMax > current.value) ? curMax : current.value
}, 0)



const normalizedD = d.map(d => ({ time: d.time, value: toPercentage(d.value, max) }))
const yearlyMeanPercent = toPercentage(yearlyMeanValue, max)
// // const yearlyMeanValue = footballCsv.reduce((totalValue, footballItem) => totalValue + Number(footballItem[1]), 0) / footballCsv.length


// const ranges = [[]]
// d.forEach(val => {
//   const lastRange = ranges[ranges.length - 1]
//   const firstElementOfLastRange = lastRange[0]


//   // there's nothing to compare, create the first range
//   if (!firstElementOfLastRange) {
//     lastRange.push(val)
//     return
//   }

//   const firstElementOfLastRangeValue = (firstElementOfLastRange.value)


//   const isLastRangeSmallerThanYearlyMean = firstElementOfLastRangeValue < yearlyMeanValue

//   if ((val[1]) < yearlyMeanValue) {
//     if (isLastRangeSmallerThanYearlyMean) {
//       lastRange.push(val)
//     } else {
//       ranges.push([val])
//     }

//     return
//   }

//   console.log(val[1], isLastRangeSmallerThanYearlyMean, yearlyMeanValue);

//   // val >= mean D
//   const isLastRangeBiggerThanyearlyMeanValueata = !isLastRangeSmallerThanYearlyMean
//   if (isLastRangeBiggerThanyearlyMeanValueata) {
//     lastRange.push(val)
//   } else {
//     ranges.push([val])
//   }
// })

// console.log({ ranges });




const { Content, Sider } = Layout;
const { Title } = Typography


const { RangePicker } = DatePicker;

enum DataType {
  RAW = 'RAW',
  NORMALIZED = 'NORMALIZED'
}

const DATA_TYPE_OPTIONS = [
  { label: 'Raw', value: DataType.RAW },
  { label: 'Normalized', value: DataType.NORMALIZED },
];

const ROUTES = [
  {
    label: 'Home'
  }, {
    label: 'Map'
  }
]



export default function Home() {
  const [dateRange, setDateRange] = useState<[Date, Date]>()
  const [dataType, setDataType] = useState<DataType>(DataType.RAW)
  const [data, setData] = useState()



  return (
    <Layout className='p-7 min-h-screen'>
      <Sider width={200} className="mr-5">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%' }}
          items={ROUTES}
        />
      </Sider>

      <Content>
        <div className='my-5'>
          <RangePicker value={dateRange} onChange={setDateRange} className='mr-5' />
          <Radio.Group options={DATA_TYPE_OPTIONS} onChange={e => setDataType(e.target.value)} value={dataType} optionType="button" />
        </div>

        <div className='mb-10'>
          <Title level={2}>Daily Values:</Title>
          <CustomizedBarChart yearlyMeanValue={yearlyMeanValue} data={d} />
        </div>

        <Title level={2}>Trends:</Title>
        <LineChart width={1000} height={500} data={d}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey={x => x.time} />
          <YAxis dataKey={x => x.value} />
          <Tooltip />
          <Line dataKey={x => x.value} stroke={'#399918'} isAnimationActive={false} />
          <Line dataKey={x => x.lineRedValue} stroke={'#FF7777'} isAnimationActive={false} />
        </LineChart>

      </Content>

    </Layout>
  );
}
