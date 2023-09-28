import { useParams } from 'react-router-dom';

import Card from '../components/Card';
import ExerciseGraph from '../components/ExerciseGraph';
import QuestionnaireResults from '../components/QuestionnaireResults';
import withLayout from '../hoc/withLayout';
import withSpinner from '../hoc/withSpinner';
import useExercise from '../hooks/useExercise';
import {
  MdModeEdit,
} from 'react-icons/md';

type ExercisePageParams = {
  patientId: string;
  exerciseId: string;
};

const MyProfilePage: React.FC = () => {
  const { patientId, exerciseId } = useParams<ExercisePageParams>();
  const { answers, questionnaire, sensor, session, loading } = useExercise(
    patientId!,
    exerciseId!,
  );

  return (
    <>
      <Card loading={loading} minH="lg">
        <div style={{display: 'flex', justifyContent: 'space-between', marginLeft: '20px', marginRight: '20px', marginBottom: '20px', padding: '10px', borderBottom: '1.5px solid gray'}}>
            <h1 style={{fontWeight: 'bold'}}>About Me</h1>  
            <div style={{ flexDirection: 'row', display: 'flex'}}>
              <MdModeEdit style={{marginTop: '4px', marginRight: '3px'}}/>
              <h1>Edit</h1> 
            </div> 
        </div>
        <h3>Mail Account: </h3>
        <h3>Name: </h3>
        <h3>Gender: </h3>
        <h3>Age: </h3>
        <h3>Height: </h3>
        <h3>Body mass: </h3>
      </Card>

      
    </>
  );
};

export default withLayout(withSpinner(MyProfilePage, 300));