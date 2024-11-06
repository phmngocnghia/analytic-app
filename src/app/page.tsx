"use client"
import { Radio, Typography } from 'antd';
import { DatePicker, Layout, Menu } from 'antd';
import { useMemo, useState } from "react";
import footballCsv from '../data/football.csv'
import dayjs, { Dayjs } from 'dayjs'
import { CustomizedBarChart } from '@/app/components/CustomBarChart';
import { toPercentage } from '@/utils';
import { CustomLineChart } from '@/app/components/CustomLineChart';
import dayjsIsBetween from 'dayjs/plugin/isBetween'
import Link from 'next/link'
import { FootballItem } from '@/types';

dayjs.extend(dayjsIsBetween)

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
    label: <Link href="/">Home</Link>
  }, {
    label: <Link href="/map">Map</Link>
  }
]



const DATE_RANGE_INDEX = {
  'START': 0,
  'END': 1
}


/**
 * suggestion to improve:
 * move long execute code to worker thread to avoid blocking render
 */
export default function Home() {
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>([dayjs().set('y', 2021).startOf('y'), dayjs().set('y', 2021).endOf('y')])

  const [dataType, setDataType] = useState<DataType>(DataType.RAW)

  const yearlyAverage = useMemo(() => {
    let yearlyItems = footballCsv

    // if no time is selected
    if (dateRange?.length > 0) {
      // in case user selects time range more than 2 years. e.g: filter time from 2020 -> 2021
      const yearToFilters = [...new Set([dateRange[DATE_RANGE_INDEX.START].get('year'), dateRange[DATE_RANGE_INDEX.END].get('year')])]



      yearlyItems = footballCsv.filter(footbalItem => {
        const footballItemYear = dayjs(footbalItem.time).get('y')
        return yearToFilters.includes(footballItemYear)
      })
    }


    const yearlyItemsTotal = yearlyItems.reduce((totalValue, footballItem) => totalValue + Number(footballItem.value), 0)
    const yearlyAverage = yearlyItemsTotal / yearlyItems.length
    return yearlyAverage
  }, [])




  const filteredData = useMemo(() => {
    const formatFootballItem = (footballItem: FootballItem) => {
      return {
        // line red to override the red spot on the line chart when value < yearly value
        time: dayjs(footballItem.time).format('DD/MM/YYYY'), value: footballItem.value, lineRedValue: footballItem.value < yearlyAverage ? footballItem.value : undefined
      }
    }

    const shouldFilter = dateRange?.length > 0
    if (!shouldFilter) {
      return footballCsv.map(formatFootballItem)
    }

    return footballCsv.filter((footballItem) => {
      return dayjs(footballItem.time).isBetween(dateRange[DATE_RANGE_INDEX.START], dateRange[DATE_RANGE_INDEX.END])
    }).map(formatFootballItem)
  }, [dateRange])

  const maxValue = useMemo(() => filteredData.reduce(function (curMax, item) {
    return (curMax > item.value) ? curMax : item.value
  }, 0), [filteredData])

  // to be used when data type = 'raw'
  const normalizedYearlyAverage = useMemo(() => toPercentage(yearlyAverage, maxValue), [yearlyAverage, maxValue])
  // line red to override the red spot on the line chart when value < yearly value
  const normalizedData = useMemo(() => filteredData.map(d => ({ time: d.time, value: toPercentage(d.value, maxValue), lineRedValue: typeof d.lineRedValue !== 'undefined' ? toPercentage(d.lineRedValue, maxValue) : undefined })), [filteredData],)
  const shouldDisplayRawData = dataType === DataType.RAW

  const dataToShow = shouldDisplayRawData ? filteredData : normalizedData
  const yearlyAverageToUse = shouldDisplayRawData ? yearlyAverage : normalizedYearlyAverage

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
          <CustomizedBarChart yearlyMeanValue={yearlyAverageToUse} data={dataToShow} />
        </div>

        <Title level={2}>Trends:</Title>
        <CustomLineChart data={dataToShow} />

      </Content>

    </Layout>
  );
}
