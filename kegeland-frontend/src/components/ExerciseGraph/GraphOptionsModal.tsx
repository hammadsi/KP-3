import {
  Button,
  Divider,
  Grid,
  GridItem,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Select,
  Switch,
  Text,
} from '@chakra-ui/react';
import { ChartType } from 'chart.js';

import useGraphProfileSelector from '../../hooks/useGraphProfileSelector';
import { Sensor } from '../../state/ducks/sensors/sensors.interface';

export type GraphOptionsProps = {
  sensor: Sensor;
  updatePlot: (label: string, plot: ChartType) => void;
  resetPlot: () => void;
  updateXAxis: (value: boolean) => void;
} & Omit<ModalProps, 'children'>;

const GraphOptionsModal: React.FC<GraphOptionsProps> = ({
  sensor,
  updatePlot,
  resetPlot,
  updateXAxis,
  isOpen,
  onClose,
  ...props
}) => {
  const profile = useGraphProfileSelector(sensor.name);

  return (
    <Modal {...props} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay>
        <ModalContent>
          <ModalHeader paddingTop={2.5}>
            <Text>Chart Configuration</Text>
          </ModalHeader>
          {profile ? (
            <ModalBody>
              <Text fontWeight="semibold" fontSize={18} marginBottom={2}>
                Plot settings
              </Text>
              <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                {Object.entries(profile.labels).map(([label, val]) => (
                  <GridItem key={label}>
                    <HStack>
                      <Text fontWeight="medium">{label}</Text>
                      <Select
                        value={val.plotType}
                        onChange={(event) =>
                          updatePlot(label, event.target.value as ChartType)
                        }>
                        <option value="line">Line plot</option>
                        <option value="bar">Bar plot</option>
                        <option value="scatter">Scatter plot</option>
                      </Select>
                    </HStack>
                  </GridItem>
                ))}
              </Grid>
              <Divider marginY={4} />
              <Text fontWeight="semibold" fontSize={18} marginBottom={2}>
                Labels
              </Text>

              <Text fontWeight="semibold" fontSize={16}>
                X-axis
              </Text>

              <HStack>
                <Text>Display timedelta</Text>
                <Switch
                  isChecked={profile.useTimedelta}
                  onChange={() => updateXAxis(!profile.useTimedelta)}
                />
              </HStack>
            </ModalBody>
          ) : (
            <p>Loading</p>
          )}
          <ModalFooter justifyContent="space-between">
            <Button variant="ghost" onClick={resetPlot}>
              Reset to default
            </Button>
            <Button color="white" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default GraphOptionsModal;
