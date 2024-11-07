"use client"
import { Radio, Typography } from 'antd';
import { DatePicker } from 'antd';
import { startTransition, useMemo, useState } from "react";
import footballCsv from '../data/football.csv'
import dayjs, { Dayjs } from 'dayjs'
import { CustomizedBarChart } from '@/app/components/CustomBarChart';
import { toPercentage } from '@/utils';
import { CustomLineChart } from '@/app/components/CustomLineChart';
import dayjsIsBetween from 'dayjs/plugin/isBetween'
import { FootballItem } from '@/types';
import { ErrorBoundary } from '@/app/components/ErrorBoundary'
import { DATA_TYPE_OPTIONS, DATE_RANGE_INDEX, } from './constants';

dayjs.extend(dayjsIsBetween)

const { Title } = Typography


const { RangePicker } = DatePicker;




/**
 * suggestion to improve:
 * move long execute code to worker thread to avoid blocking render
 */
export default function Home() {
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs] | null>([dayjs().set('y', 2021).startOf('y'), dayjs().set('y', 2021).endOf('y')])

  const [dataType, setDataType] = useState<DataType>(DATA_TYPE_OPTIONS.RAW)

  const yearlyAverage = useMemo(() => {
    let yearlyItems = footballCsv

    // if no time is selected
    if (dateRange && dateRange.length > 0) {
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
  }, [dateRange])

  const filteredData = useMemo(() => {
    const formatFootballItem = (footballItem: FootballItem) => {
      return {
        // line red to override the red spot on the line chart when value < yearly value
        time: dayjs(footballItem.time).format('DD/MM/YYYY'), value: footballItem.value, lineRedValue: footballItem.value < yearlyAverage ? footballItem.value : undefined
      }
    }

    const shouldFilter = dateRange && dateRange?.length > 0
    if (!shouldFilter) {
      return footballCsv.map(formatFootballItem)
    }

    return footballCsv.filter((footballItem) => {
      return dayjs(footballItem.time).isBetween(dateRange[DATE_RANGE_INDEX.START], dateRange[DATE_RANGE_INDEX.END])
    }).map(formatFootballItem)
  }, [dateRange, yearlyAverage])

  const maxValue = useMemo(() => filteredData.reduce(function (curMax, item) {
    return (curMax > item.value) ? curMax : item.value
  }, 0), [filteredData])


  // to be used when data type = 'raw'
  const normalizedYearlyAverage = useMemo(() => toPercentage(yearlyAverage, maxValue), [yearlyAverage, maxValue])
  // line red to override the red spot on the line chart when value < yearly value
  const normalizedData = useMemo(() => filteredData.map(d => ({ time: d.time, value: toPercentage(d.value, maxValue), lineRedValue: typeof d.lineRedValue !== 'undefined' ? toPercentage(d.lineRedValue, maxValue) : undefined })), [filteredData, maxValue],)
  const shouldDisplayRawData = dataType === DataType.RAW

  const dataToShow = shouldDisplayRawData ? filteredData : normalizedData
  const yearlyAverageToUse = shouldDisplayRawData ? yearlyAverage : normalizedYearlyAverage

  return (
    <>
      <ErrorBoundary>
        <div className='mb-5 flex flex-col sm:flex-row'>
          <RangePicker value={dateRange} onChange={dateRange => {
            startTransition(() => {

              setDateRange(dateRange as [Dayjs, Dayjs] | null)
            })
          }} className='mr-5' />
          <Radio.Group options={DATA_TYPE_OPTIONS} onChange={e => setDataType(e.target.value)} value={dataType} optionType="button" className='mt-5 sm:mt-0' />
        </div>
      </ErrorBoundary>

      <ErrorBoundary>
        <div className='mb-10'>
          <Title level={3}>Daily Values:</Title>
          <CustomizedBarChart yearlyAverage={yearlyAverageToUse} data={dataToShow} />
        </div>
      </ErrorBoundary>

      <ErrorBoundary>
        <Title level={4} className="mb-5">Trends:</Title>
        <CustomLineChart data={dataToShow} yearlyAverage={yearlyAverage} />
        <div className='mt-20'>
          123
        </div>
      </ErrorBoundary>
    </>
  );
}
