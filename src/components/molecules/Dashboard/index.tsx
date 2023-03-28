import React from 'react';
import { Column, Bar, Pie, DualAxes  } from '@ant-design/plots';
import { Row, Col, Card } from 'antd';

import styles from './styles.module.scss';
import Meta from 'antd/es/card/Meta';

const Dashboards = () => {

  // number user contributors by month
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
    xField: 'year',
    yField: 'value',
  };

  // total ideas for all system in each year
  const dataPieChart = [
    {
      type: '2017',
      value: 27,
    },
    {
      type: '2018',
      value: 25,
    },
    {
      type: '2019',
      value: 18,
    },
    {
      type: '2022',
      value: 15,
    },
  ];
  const configPieChart = {
    data: dataPieChart,
    appendPadding: 10,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({percent}: any) => `${(percent * 100)?.toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };
  // total ideas for each departments
  const dataLineChart = [
    {
      year: '1991',
      value: 3,
      count: 10,
    },
    {
      year: '1992',
      value: 4,
      count: 4,
    },
    {
      year: '1993',
      value: 3.5,
      count: 5,
    },
    {
      year: '1994',
      value: 5,
      count: 5,
    },
    {
      year: '1995',
      value: 4.9,
      count: 4.9,
    },
    {
      year: '1996',
      value: 6,
      count: 35,
    },
    {
      year: '1997',
      value: 7,
      count: 7,
    },
    {
      year: '1998',
      value: 9,
      count: 1,
    },
    {
      year: '1999',
      value: 13,
      count: 20,
    },
  ];
  const configLineChart = {
    data: [dataLineChart, dataLineChart],
    xField: 'year',
    yField: ['value', 'count'],
    geometryOptions: [
      {
        geometry: 'line',
        color: '#5B8FF9',
      },
      {
        geometry: 'line',
        color: '#5AD8A6',
      },
    ],
  };
  return (
    <div className={styles.dashboardContainer}>
      <Row gutter={25}>
        <Col span={6}>
          <Card>
            <h3>Today's ideas</h3>
            <p>Nội dung thông tin 1</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <h3>Info 2</h3>
            <p>Nội dung thông tin 2</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <h3>Info 3</h3>
            <p>Nội dung thông tin 2</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <h3>Info 4</h3>
            <p>Nội dung thông tin 2</p>
          </Card>
        </Col>
      </Row>
      <Row className='mt-4' gutter={16}>
        <Col span={10}>
          <Card >
            <Card className={styles.cardColumnChart}>
              <Column
                {...config}
                height={300}
                color= '#dfe7f7'
              />
            </Card>
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </Col>
        <Col span={14}>
          <Card>
            <DualAxes
              {...configLineChart}
              height={300}
            /> 
          </Card>
        </Col>
      </Row>
      <Row className='mt-4'  gutter={[16, 16]}>
        <Col span={12}>
          <Card>
            <Pie
              {...configPieChart}
              height={300}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Bar
              {...config}
              height={300}

            />
          </Card>
        </Col>
      </Row>

    </div>
  );
}

export default Dashboards