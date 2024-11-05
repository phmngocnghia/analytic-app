"use client"
import { Radio, Typography } from 'antd';
import { DatePicker, Layout, Menu } from 'antd';
import { useState } from "react";
import footballCsv from '../data/football.csv'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Rectangle } from 'recharts'
import dayjs from 'dayjs'


const d = footballCsv.slice(-200).map(([m, v]) => [dayjs(m).format('DD/MM/YYYY'), v])
const meanD = footballCsv.reduce((totalValue, footballItem) => totalValue + Number(footballItem[1]), 0) / footballCsv.length







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

const CustomBar = (props) => {
  const { value } = props;

  let fill

  if (Number(value) < meanD) {
    fill = '#FF7777'
  } else {
    fill = '#399918'
  }


  //use explicit fill here, or use the additional css class and make a css selector to update fill there
  return <Rectangle {...props} fill={fill} />
};

export default function Home() {
  const [dateRange, setDateRange] = useState<[Date, Date]>()
  const [dataType, setDataType] = useState<DataType>(DataType.RAW)

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
          <BarChart width={1000} height={1000} data={d}>
            <XAxis dataKey={x => x[0]} />
            <YAxis dataKey={x => x[1]} />
            <Bar shape={CustomBar} dataKey={x => x[1]} />
            <Tooltip />
          </BarChart>
        </div>

        <Title level={2}>Trends:</Title>
      </Content>

    </Layout>
  );
}
