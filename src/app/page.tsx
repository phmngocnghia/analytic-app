"use client"
import { Line, Bar } from '@ant-design/charts';
import { Radio, Typography } from 'antd';
import { DatePicker, Layout, Menu } from 'antd';
import { useState } from "react";

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

  const data = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ];

  const config = {
    data,
    height: 400,
    xField: 'year',
    yField: 'value',
  };


  return (
    <Layout className='p-5 min-h-screen'>
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

        <Title level={2}>Daily Values:</Title>
        <Bar {...config} className="mb-10" />

        <Title level={2}>Trends:</Title>
        <Line {...config} />
      </Content>

    </Layout>
  );
}
