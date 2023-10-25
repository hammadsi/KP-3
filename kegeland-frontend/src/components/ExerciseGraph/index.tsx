import { Chart } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';
import { Chart as ChartJS } from 'chart.js';
import 'chart.js/auto';
import { useDisclosure, Divider, Box } from '@chakra-ui/react';
import 'chartjs-adapter-moment';

import useGraphProfile from '../../hooks/useGraphProfile';
import { Sensor } from '../../state/ducks/sensors/sensors.interface';
import { Session } from '../../state/ducks/sessions/sessions.interface';

import GraphOptionsModal from './GraphOptionsModal';
import GraphHeader from './GraphHeader';

ChartJS.register(zoomPlugin);

type ExerciseGraphProps = {
  sensor: Sensor;
  session: Session;
};

const ExerciseGraph: React.FC<ExerciseGraphProps> = ({ sensor, session }) => {
  const { options, chartData, chartRef, updatePlot, resetPlot, updateXAxis } = useGraphProfile(sensor, session);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box h="100%" w="100%">
      {chartData && (
        <>
          <GraphHeader
            sensor={sensor}
            session={session}
            toggleSettings={onOpen}
          />
          <Divider borderColor="gray.300" marginY={4} />
          <div style={{ width: '99%' }}>
            <Chart
              height={150}
              ref={chartRef}
              type="line"
              options={options}
              data={chartData}
            />
          </div>
        </>
      )}
      <GraphOptionsModal
        sensor={sensor}
        isOpen={isOpen}
        onClose={onClose}
        updatePlot={updatePlot}
        resetPlot={resetPlot}
        updateXAxis={updateXAxis}
      />
    </Box>
  );
};

export default ExerciseGraph;
