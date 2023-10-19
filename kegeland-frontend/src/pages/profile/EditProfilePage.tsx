import { useNavigate } from 'react-router-dom';
import {
  Button,
  Stack,
  FormControl,
  FormLabel,
  Select,
  Input,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import Card from '../../components/Card';
import withLayout from '../../hoc/withLayout';
import withSpinner from '../../hoc/withSpinner';
import useWheelchairPatient from '../../hooks/useWheelchairPatient';
import { RootState } from '../../state/store';
import { UpdateWheelchairPatientData } from '../../state/ducks/wheelchairPatients/wheelchairPatients.interface';

const EditProfilePage = () => {
  const { authUser } = useSelector((state: RootState) => state.auth);

  const { wheelchairPatient, loading, updatePatientData } =
    useWheelchairPatient(authUser?.id);

  const navigate = useNavigate();

  useEffect(() => {
    if (wheelchairPatient) {
      setUpdatedData({
        pid: wheelchairPatient.id,
        currentPhysicalState: {
          ...wheelchairPatient.currentPhysicalState, // Preserve other values
          height: wheelchairPatient.currentPhysicalState.height || 0,
          weight: wheelchairPatient.currentPhysicalState.weight || 0,
        },
      });
    }
  }, [wheelchairPatient]);

  const [updatedData, setUpdatedData] = useState<UpdateWheelchairPatientData>({
    pid: wheelchairPatient?.id ? wheelchairPatient.id : '',
    currentPhysicalState: {
      height: 0,
      weight: 0,
      maxHeartRate: 0,
      averageHeartRate: 0,
      maxWheelchairSpeed: 0,
      averageWheelchairSpeed: 0,
    },
  });

  const update = () => {
    updatePatientData(updatedData);
    navigate('/myprofile');
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const height = parseFloat(e.target.value);
    setUpdatedData((prevData) => ({
      ...prevData,
      currentPhysicalState: {
        ...prevData.currentPhysicalState,
        height,
      },
    }));
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const weight = parseFloat(e.target.value);
    setUpdatedData((prevData) => ({
      ...prevData,
      currentPhysicalState: {
        ...prevData.currentPhysicalState,
        weight,
      },
    }));
  };

  const allFilled = (): boolean => {
    return (
      updatedData.currentPhysicalState.height > 0 &&
      updatedData.currentPhysicalState.weight > 0
    );
  };

  return (
    <>
      <Card loading={loading} minH="lg">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginLeft: '20px',
            marginRight: '20px',
            marginBottom: '20px',
            padding: '10px',
            borderBottom: '1.5px solid gray',
          }}>
          <h1 style={{ fontWeight: 'bold' }}>About Me</h1>
        </div>
        <div style={{ marginLeft: '20%', marginRight: '20%' }}>
          <Stack spacing={10} direction="row" mt={6}>
            <FormControl>
              <FormLabel>Height</FormLabel>
              <Input
                name="height"
                type="number"
                value={updatedData.currentPhysicalState.height}
                onChange={handleHeightChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Weight</FormLabel>
              <Input
                name="weight"
                type="number"
                value={updatedData.currentPhysicalState.weight}
                onChange={handleWeightChange}
              />
            </FormControl>
          </Stack>
          <Stack direction="row" spacing={10} mt={10} justifyContent="center">
            <Button colorScheme="gray" onClick={() => navigate('/myprofile')}>
              Cancel
            </Button>
            <Button colorScheme="blue" disabled={!allFilled()} onClick={update}>
              Submit
            </Button>
          </Stack>
        </div>
      </Card>
    </>
  );
};

export default withLayout(withSpinner(EditProfilePage, 300));
