// WheelchairPatientComponent.tsx
import React from 'react';
import useWheelchairPatientById from '../hooks/useWheelchairPatient';

interface WheelchairPatientComponentProps {
  id: string;
}

const WheelchairPatientComponent: React.FC<WheelchairPatientComponentProps> = ({ id }) => {
  const { wheelchairPatient, loading, error } = useWheelchairPatientById(id);
  console.log("Component render. Loading: ", loading, ". Error: ", error, ". Patient: ", wheelchairPatient);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!wheelchairPatient) return <p>No patient found</p>;

  return (
    <div>
      <h2>Wheelchair Patient</h2>
      <p>ID: {wheelchairPatient.patientId}</p>
      {/* Other patient data... */}
    </div>
  );
};

export default WheelchairPatientComponent;
