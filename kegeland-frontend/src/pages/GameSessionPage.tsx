import { Button, Center, Collapse } from '@chakra-ui/react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';

import Card from '../components/Card';
import Graph from '../components/Graph';
import QuestionnaireResults from '../components/QuestionnaireResultsWheelchair';
import withLayout from '../hoc/withLayout';
import withSpinner from '../hoc/withSpinner';
import useExercise from '../hooks/useExercise';
import useWheelchairPatient from '../hooks/useWheelchairPatient';
import useUploadIMUData from '../hooks/useUploadIMUData';

type GameSessionPageParams = {
  patientId: string;
  id: string;
};

const GameSessionPage: React.FC = () => {
  const { patientId, id } = useParams<GameSessionPageParams>();
  const { wheelchairPatient } = useWheelchairPatient(patientId);

  const headingStyle = {
    color: 'var(--chakra-colors-blackAlpha-800)',
    fontWeight: 'bold',
    fontSize: '24px',
    margin: '25px 0 10px 0',
  };

  let gameSession;
  const sessionId = id;
  
  if (wheelchairPatient) {
    gameSession = wheelchairPatient!.gameSessions.find(
      (session) => session.id === sessionId,
    );
  }

  const { sensor, session, loading } = useExercise(patientId!, sessionId!);
  const [visible, setVisible] = useState(false);

  // New code for file upload
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'done'>('idle');

  const {
    uploadIMUData,
    loading: imuUploadLoading,
    error: imuUploadError,
  } = useUploadIMUData();

  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const triggerFileUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = async function (event) {
        const text = event?.target?.result?.toString();
        if (!text) {
          console.error('Could not read file.');
          return;
        }
        const lines = text.split('\n');
        const imuData = [];

        for (let i = 1; i < lines.length; i++) {
          const line = lines[i];
          const parts = line.split(',');

          if (parts.length === 7) {
            const [timestamp, xAccel, yAccel, zAccel, xGyro, yGyro, zGyro] =
              parts.map((part) => parseFloat(part));

            imuData.push({
              timestamp,
              accelerometer: {
                x: xAccel,
                y: yAccel,
                z: zAccel,
              },
              gyroscope: {
                x: xGyro,
                y: yGyro,
                z: zGyro,
              },
            });
          }
        }

        try {
          await uploadIMUData(patientId!, sessionId!, imuData);
          setUploadStatus('done');
        } catch (error) {
          console.error('Error uploading IMU data:', error);
          setUploadStatus('idle');
        }
        // TODO: Update the Firestore with Update calls to the API when endpoints are ready.
        setUploadStatus('done');
      };

      reader.onerror = function (event) {
        console.error('An error occurred while reading the file:', event);
        setUploadStatus('idle');
      };

      reader.readAsText(selectedFile);
    }
  };

  return (
    <>
      <Card loading={loading} minH="lg">
        {sensor && session && <Graph session={gameSession} />}
      </Card>
      <Button
        onClick={() => {
          setVisible(!visible);
        }}>
        {visible ? <ArrowUpIcon /> : <ArrowDownIcon />}
        {visible
          ? '  Hide questionnaire results'
          : '  Show questionnaire results'}
      </Button>
      <Collapse in={visible}>
        <Card loading={loading} h="100%">
          <QuestionnaireResults questionnaire={gameSession?.questionnaires} />
        </Card>
      </Collapse>
      <Card>
        <h2 style={headingStyle}> Upload IMU data for session</h2>
        <Center marginTop={12}>
          <input
            type="file"
            id="imuData"
            name="imuData"
            accept=".csv"
            onChange={handleFileSelection}
          />
          <Button
            onClick={triggerFileUpload}
            ml={4}
            isDisabled={!selectedFile || imuUploadLoading}
            colorScheme={uploadStatus === 'done' ? 'green' : 'blue'}>
            {uploadStatus === 'done'
              ? 'Uploaded'
              : imuUploadLoading
              ? 'Uploading...'
              : 'Upload selected IMU Data'}
          </Button>
          {imuUploadError && <p>Error uploading data: {imuUploadError}</p>}
        </Center>
      </Card>
    </>
  );
};

export default withLayout(withSpinner(GameSessionPage, 300));
