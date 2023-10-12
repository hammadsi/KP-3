import React, { useState, useEffect } from 'react';
import useWheelchairPatient from '../hooks/useWheelchairPatient';
import { UpdateWheelchairPatientData } from '../state/ducks/wheelchairPatients/wheelchairPatients.interface';

const PatientUpdateForm = ({ patientId }: { patientId: string }) => {
  const { wheelchairPatient, error, loading, updatePatientData } = useWheelchairPatient(patientId);

  // Initialize updatedData inside the useEffect
  useEffect(() => {
    if (wheelchairPatient) {
      setUpdatedData({
        pid: patientId,
        currentPhysicalState: {
          ...wheelchairPatient.currentPhysicalState, // Preserve other values
          height: wheelchairPatient.currentPhysicalState.height || 0,
          weight: wheelchairPatient.currentPhysicalState.weight || 0,
        },
      });
    }
  }, [patientId, wheelchairPatient]);

  const [updatedData, setUpdatedData] = useState<UpdateWheelchairPatientData>({
    pid: patientId,
    currentPhysicalState: {
      height: 0,
      weight: 0,
      maxHeartRate: 0,
      averageHeartRate: 0,
      maxWheelchairSpeed: 0,
      averageWheelchairSpeed: 0,
    },
  });

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

  const handleSubmit = () => {
    // Call the updatePatientData function with the updatedData
    updatePatientData(updatedData);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Update Patient's Physical State</h2>
      <div>
        <label>Height (cm):</label>
        <input type="number" value={updatedData.currentPhysicalState.height} onChange={handleHeightChange} />
      </div>
      <div>
        <label>Weight (kg):</label>
        <input type="number" value={updatedData.currentPhysicalState.weight} onChange={handleWeightChange} />
      </div>
      <button onClick={handleSubmit}>Update</button>
    </div>
  );
};

export default PatientUpdateForm;
