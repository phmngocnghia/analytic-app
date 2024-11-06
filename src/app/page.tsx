"use client"
import { Radio, Typography } from 'antd';
import { DatePicker, Layout, Menu } from 'antd';
import { useMemo, useState } from "react";
import footballCsv from '../data/football.csv'
import dayjs, { Dayjs } from 'dayjs'
import { CustomizedBarChart } from '@/components/CustomBarChart';
import { toPercentage } from '@/utils';
import { CustomLineChart } from '@/components/CustomLineChart';
import dayjsIsBetween from 'dayjs/plugin/isBetween'

dayjs.extend(dayjsIsBetween)



// const maxValue = d.reduce(function (curMax, current) {

//   return (curMax > current.value) ? curMax : current.value
// }, 0)



// const normalizedD = d.map(d => ({ time: d.time, value: toPercentage(d.value, max) }))
// const yearlyMeanPercent = toPercentage(yearlyMeanValue, max)
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



console.log('demo', dayjs().startOf('M'));

export default function Home() {
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>([dayjs().set('y', 2021).startOf('y'), dayjs().set('y', 2021).endOf('y')])

  const [dataType, setDataType] = useState<DataType>(DataType.RAW)
  const [data, setData] = useState()

  const yearlyAverage = useMemo(() => {
    // in case user selects time range more than 2 years. e.g: filter time from 2020 -> 2021
    const yearToFilters = [...new Set([dateRange[0].get('year'), dateRange[1].get('year')])]


    const yearlyItems = footballCsv.filter(footbalItem => {
      const footballItemYear = dayjs(footbalItem.Time).get('y')
      return yearToFilters.includes(footballItemYear)
    })

    const yearlyItemsTotal = yearlyItems.reduce((totalValue, footballItem) => totalValue + Number(footballItem.Value), 0)
    const yearlyAverage = yearlyItemsTotal / yearlyItems.length
    return yearlyAverage
  }, [])



  const filteredData = useMemo(() => {
    return footballCsv.filter((footballItem) => {
      return dayjs(footballItem.Time).isBetween(dateRange[0], dateRange[1])
    }).map((footballItem) => {
      return {
        time: dayjs(footballItem.Time).format('DD/MM/YYYY'), value: footballItem.Value, lineRedValue: footballItem.Value < yearlyAverage ? footballItem.Value : undefined
      }
    })
  }, [dateRange])






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
          <CustomizedBarChart yearlyMeanValue={yearlyAverage} data={filteredData} />
        </div>

        <Title level={2}>Trends:</Title>
        <CustomLineChart data={filteredData} />

      </Content>

    </Layout>
  );
}
