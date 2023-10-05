import { useParams } from 'react-router-dom';

import Card from '../../components/Card';
import withLayout from '../../hoc/withLayout';
import withSpinner from '../../hoc/withSpinner';
import useExercise from '../../hooks/useExercise';
import { Link } from '@chakra-ui/react';

type ExercisePageParams = {
  patientId: string;
  exerciseId: string;
};


const EditProfilePage: React.FC = () => {
    
    const { patientId, exerciseId } = useParams<ExercisePageParams>();
    const { loading } = useExercise(
      patientId!,
      exerciseId!,
    );
    
  
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
            borderBottom: '1.5px solid gray'}}>
          <h1 style={{fontWeight: 'bold'}}>About Me</h1>  
        </div>
      </Card>
      </>
    );
  };
  
  export default withLayout(withSpinner(EditProfilePage, 300));