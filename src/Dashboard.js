import React from 'react';
import {useQuery} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';
import { ResponsiveLine } from '@nivo/line'
import _ from 'lodash'

const EXCHANGE_RATES = gql`
    query GetWeights($ticker: String!) {
        RecentWeights(ticker: $ticker, count: 15) {
            ticker
            fourWeight
            profitWeight
            twitterWeight
            movingWeight
            companyWeight
            date
        }
    }
`;

export default function RenderDashboard({ticker}) {
  const {loading, error, data} = useQuery(EXCHANGE_RATES, {
    variables: {
      ticker
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const fourWeight = _.map(data.RecentWeights, function(d) { return { x: new Date(d.date), y: d.fourWeight}})
  const profitWeight = _.map(data.RecentWeights, function(d) { return { x: new Date(d.date), y: d.profitWeight}})
  const twitterWeight = _.map(data.RecentWeights, function(d) { return { x: new Date(d.date), y: d.twitterWeight}})
  const movingWeight = _.map(data.RecentWeights, function(d) { return { x: new Date(d.date), y: d.movingWeight}})
  const companyWeight = _.map(data.RecentWeights, function(d) { return { x: new Date(d.date), y: d.companyWeight}})

  const chartData = [
    {
      id: 'Four Weight',
      data: fourWeight
    },
    {
      id: 'Profit Weight',
      data: profitWeight
    },
    {
      id: 'Twitter Weight',
      data: twitterWeight
    },
    {
      id: 'Moving Weight',
      data: movingWeight
    },
    {
      id: 'Company Weight',
      data: companyWeight
    }
  ]

  return (
    <div className="col-12" style={{height: '500px'}}>
      <h3>{ticker}</h3>
      <ResponsiveLine
        data={chartData}
        margin={{ top: 50, right: 110, bottom: 100, left: 60 }}
        xScale={{
          type: 'time',
          format: 'native'
        }}
        xFormat="time:%Y-%m-%d %H:%M:%S"
        yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          format: '%Y-%m-%d %H:%M:%S',
          tickValues: 'every 4 hours',
          tickRotation: 45
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'weight',
          legendOffset: -40,
          legendPosition: 'middle'
        }}
        colors={{ scheme: 'nivo' }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="y"
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
      />
    </div>

  )
}