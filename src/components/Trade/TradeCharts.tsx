import { generateChartRandomData } from 'components/Category/utils';

import { useAppSelector } from 'hooks';

import ChartHeader from '../ChartHeader';
import LineChart from '../LineChart';

function TradeCharts() {
  const showCharts = useAppSelector(state => state.trade.showCharts);
  const predictions = useAppSelector(state => state.trade.predictions);

  if (!showCharts) return null;

  const lineChartDataA = generateChartRandomData();
  const lineChartDataB = generateChartRandomData(true);

  return (
    <div className="trade-charts">
      <ChartHeader
        intervals={[
          { id: 'hour', name: '1H', value: 60 },
          { id: '12hour', name: '12H', value: 120 },
          { id: 'day', name: '1D', value: 120 },
          { id: 'month', name: '1M', value: 120 }
        ]}
        defaultIntervalId="hour"
        onChangeInterval={(interval, value) => console.log(interval, value)}
      />
      <LineChart
        series={[
          { name: predictions[0].name, data: lineChartDataA },
          {
            name: predictions[1].name,
            data: lineChartDataB
          }
        ]}
        ticker="DOT"
        height={180}
      />
    </div>
  );
}

TradeCharts.displayName = 'TradeCharts';

export default TradeCharts;
