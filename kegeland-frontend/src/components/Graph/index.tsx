import { Chart } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';
import { Chart as ChartJS, ChartOptions } from 'chart.js';
import 'chart.js/auto';
import { Divider, Box } from '@chakra-ui/react';
import 'chartjs-adapter-moment';
import GraphHeader from './GraphHeader';
import { GameSession } from '../../state/ducks/wheelchairPatients/wheelchairPatients.interface';
import { useRef } from 'react';

ChartJS.register(zoomPlugin);

type ExerciseGraphProps = {
  session?: GameSession;
};

const ExerciseGraph: React.FC<ExerciseGraphProps> = ({ session }) => {

  const heartRates = session?.timeSeriesData.heartRates.map(hr => hr.heartRate);
  const timestamps = session?.timeSeriesData.heartRates.map(hr => {
    // @ts-ignore
    const date = new Date(hr.timestamp._seconds * 1000)
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const secondsVal = date.getUTCSeconds();

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secondsVal).padStart(2, '0')}`;
  });

  console.log(typeof timestamps![0])

  const chartRef = useRef(null);

  const chartData = {
    labels: timestamps,
    datasets: [
      {
        label: 'Heart Rate',
        data: heartRates,
        borderColor: '#039be5',
        backgroundColor: '#039be5',
        fill: false
      }
    ]
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    animation: false,
    spanGaps: true,
    elements: {
      line: {
        tension: 0.1,
      },
    },
    datasets: {
      bar: {},
      line: {
        pointRadius: 0,
        tension: 0.1,
      },
      scatter: {
        showLine: false,
      },
    },
    interaction: {
      mode: 'index' as const,
      intersect: true,
    },
    scales: {
      y: {
        stacked: false,
      },
      x: {
        stacked: false,
        position: 'bottom',
      },
    }
  };
  
  
  

  return (
    <Box h="100%" w="100%">
      {session && (
        <>
          <GraphHeader
            date={session!.createdAt}
            endTime={session!.endTime}
          />
          <Divider borderColor="gray.300" marginY={4} />
          <div style={{ width: '99%' }}>
            <Chart
              height={150}
              ref={chartRef}
              options={options}
              type="line"
              data={chartData}
            />
          </div>
        </>
      )}
    </Box>
  );
};

export default ExerciseGraph;
