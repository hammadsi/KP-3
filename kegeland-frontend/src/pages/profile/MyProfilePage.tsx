import { Link } from 'react-router-dom';
import { MdModeEdit } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { format, parse } from 'date-fns';

import Card from '../../components/Card';
import withLayout from '../../hoc/withLayout';
import withSpinner from '../../hoc/withSpinner';
import { RootState } from '../../state/store';
import useWheelchairPatient from '../../hooks/useWheelchairPatient';
import { User } from '../../state/ducks/auth/auth.interface';

type UserProps = {
  user: User;
};

const formatBirthDate = (birthdate: string) => {
  const parsedDate = parse(birthdate, 'yyyy-MM-dd', new Date());

  // Format the parsed date as "DD.MM.YYYY"
  const formattedDate = format(parsedDate, 'dd.MM.yyyy');
  return formattedDate;
};

const MyProfilePage: React.FC<UserProps> = ({ user }) => {
  const { authUser } = useSelector((state: RootState) => state.auth);

  // Now TypeScript knows that authUser.id is defined, so no error should be thrown here
  const { wheelchairPatient, loading } = useWheelchairPatient(authUser?.id);

  const setGender = (gender: string) => {
    if (gender === 'M') {
      return 'Male';
    }
    if (gender === 'F') {
      return 'Female';
    }
    return 'Other';
  };

  if (wheelchairPatient) {
    const { name, birthdate, gender, currentPhysicalState } = wheelchairPatient;
    const {
      height,
      weight,
      maxHeartRate,
      averageHeartRate,
      maxWheelchairSpeed,
      averageWheelchairSpeed,
    } = currentPhysicalState;
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
            <Link to="/editprofile">
              <button style={{ flexDirection: 'row', display: 'flex' }}>
                <MdModeEdit style={{ marginTop: '4px', marginRight: '3px' }} />
                <h1>Edit</h1>
              </button>
            </Link>
          </div>
          <h2
            style={{ fontSize: '30px', width: '620px', marginBottom: '0.5em' }}>
            <span
              style={{ borderBottom: '1px solid gray', paddingBottom: '2px' }}>
              Personal Details
            </span>
          </h2>
          <div
            style={{
              width: '50%',
              float: 'left',
              textAlign: 'right',
              paddingRight: '20px',
            }}>
            <h3 style={{ fontWeight: 'bold' }}>Mail Account </h3>
            <h3 style={{ fontWeight: 'bold' }}>Name</h3>
            <h3 style={{ fontWeight: 'bold' }}>Gender </h3>
            <h3 style={{ fontWeight: 'bold' }}>Date of birth </h3>
          </div>
          <div
            style={{
              width: '50%',
              float: 'right',
              textAlign: 'left',
              paddingLeft: '20px',
            }}>
            <h3>{authUser?.email}</h3>
            <h3>{name}</h3>
            <h3>{setGender(gender)}</h3>
            <h3>{formatBirthDate(birthdate)}</h3>
          </div>
          <h2
            style={{
              fontSize: '30px',
              width: '620px',
              marginBottom: '0.5em',
              marginTop: '4.5em',
            }}>
            <span
              style={{ borderBottom: '1px solid gray', paddingBottom: '2px' }}>
              Current Physical State
            </span>
          </h2>
          <div
            style={{
              width: '50%',
              float: 'left',
              textAlign: 'right',
              paddingRight: '20px',
            }}>
            <h3 style={{ fontWeight: 'bold' }}>Height </h3>
            <h3 style={{ fontWeight: 'bold' }}>Weight </h3>
            <h3 style={{ fontWeight: 'bold' }}>Max Heart Rate </h3>
            <h3 style={{ fontWeight: 'bold' }}>Average Heart Rate </h3>
            <h3 style={{ fontWeight: 'bold' }}>Max Wheelchair Speed </h3>
            <h3 style={{ fontWeight: 'bold' }}>Average Wheelchair Speed </h3>
          </div>
          <div
            style={{
              width: '50%',
              float: 'right',
              textAlign: 'left',
              paddingLeft: '20px',
            }}>
            <h3>{height || height === 0 ? height + ' cm' : '-'}</h3>
            <h3>{weight || weight === 0 ? weight + ' kg' : '-'}</h3>
            <h3>{maxHeartRate || maxHeartRate === 0 ? maxHeartRate : '-'}</h3>
            <h3>
              {averageHeartRate || averageHeartRate === 0
                ? averageHeartRate
                : '-'}
            </h3>
            <h3>
              {maxWheelchairSpeed || maxWheelchairSpeed === 0
                ? maxWheelchairSpeed + ' km/h'
                : '-'}
            </h3>
            <h3>
              {' '}
              {averageWheelchairSpeed
                ? averageWheelchairSpeed + 'km/h'
                : '-'}{' '}
            </h3>
          </div>
        </Card>
      </>
    );
  }
  return (
    <Card loading={loading} minH="lg">
      <p>No patient found.</p>;
    </Card>
  );
};

export default withLayout(withSpinner(MyProfilePage, 300));
