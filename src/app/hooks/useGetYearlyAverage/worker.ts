import { FootballItem } from "@/types"

export const calculateYearlyAverage = ({ yearToFilters, footballCsv }: { yearToFilters: number[], footballCsv: FootballItem[] }) => {
  let yearlyItems = footballCsv

  // if no time is selected
  if (yearToFilters.length > 0) {
    // in case user selects time range more than 2 years. e.g: filter time from 2020 -> 2021


    yearlyItems = footballCsv.filter(footbalItem => {
      const footballItemYear = dayjs(footbalItem.time).get('y')
      return yearToFilters.includes(footballItemYear)
    })
  }


  const yearlyItemsTotal = yearlyItems.reduce((totalValue, footballItem) => totalValue + Number(footballItem.value), 0)
  const yearlyAverage = yearlyItemsTotal / yearlyItems.length
  return yearlyAverage
}