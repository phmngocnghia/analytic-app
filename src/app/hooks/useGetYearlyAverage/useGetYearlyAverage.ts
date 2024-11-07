"use client"
import dayjs from 'dayjs'

import { useEffect, useState, useMemo } from "react"
import { useWorker } from "@koale/useworker";
import footballCsv from '../../../data/football.csv'
import { DATE_RANGE_INDEX } from "../../constants";
import { calculateYearlyAverage } from './worker';
import { DateRange } from '@/types';

export const useGetYearlyAverage = (dateRange: DateRange) => {
  const [yearlyAverage, setYearlyAverage] = useState(0)
  const [calculateYearlyAverageInWorker, { kill: stopCurrentCalculation }] = useWorker(calculateYearlyAverage, {
    remoteDependencies: [
      "https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"
    ]
  });

  const yearToGetAverage = useMemo(() => dateRange ? [...new Set([dayjs(dateRange[DATE_RANGE_INDEX.START]).get('year'), dayjs(dateRange[DATE_RANGE_INDEX.END]).get('year')])] : [], [dateRange])

  useEffect(() => {

    const calculateYearlyAverageAsync = async () => {

      stopCurrentCalculation()
      const yearlyAverage = await calculateYearlyAverageInWorker({
        yearToFilters: dateRange ? [...new Set([dayjs(dateRange[DATE_RANGE_INDEX.START]).get('year'), dayjs(dateRange[DATE_RANGE_INDEX.END]).get('year')])] : [], footballCsv
      })

      setYearlyAverage(yearlyAverage)
    }

    calculateYearlyAverageAsync(dateRange).catch((err: Error) => {
      console.error('Something went wrong when calculating yearly average', {
        err,
        dateRange
      })
    })
  }, [yearToGetAverage])

  return {
    yearlyAverage
  }


}