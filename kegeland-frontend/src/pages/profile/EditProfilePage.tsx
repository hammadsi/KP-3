import { useNavigate, useParams } from 'react-router-dom';
import { Button, Stack, FormControl, FormLabel, Select } from '@chakra-ui/react';

import Card from '../../components/Card';
import withLayout from '../../hoc/withLayout';
import withSpinner from '../../hoc/withSpinner';
import useWheelchairPatient from '../../hooks/useWheelchairPatient';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { type } from 'os';




type Gender = 'M' | 'F' | 'O';

type FormData = {
  firstName: string;
  lastName: string;
  gender: Gender;
  birthofdate: Date;
  height: number;
  weight: number;
};




const EditProfilePage = () => {

    const { authUser } = useSelector((state: RootState) => state.auth);

    const { wheelchairPatient, error, loading } = useWheelchairPatient(authUser?.id);

    const navigate = useNavigate();

    const update = (data: FormData) => {
      // TODO: Implement update logic
      // Send data to API
      // navigate to '/myprofile';
    };

    useEffect(() => {
      if (wheelchairPatient) {
        const { name, age, gender, currentPhysicalState } = wheelchairPatient;
          setFormData({
              firstName: name || '',
              lastName: name || '',
              gender: gender || 'M',
              birthofdate: new Date(),
              height: currentPhysicalState.height || 0,
              weight: currentPhysicalState.weight || 0,
          });
      }
  }, [wheelchairPatient]);

    
  
    const [formData, setFormData] = useState<FormData>({
      firstName: '',
      lastName: '',
      gender: 'M' as Gender,
      birthofdate: new Date(),
      height: 0,
      weight: 0,
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      if (e.target.name === "birthofdate") {
        const newDate = new Date(e.target.value);
        setFormData({
          ...formData,
          birthofdate: newDate
        });
      } else {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      }
    };

    // Denne må oppdateres med alle feltene som skal sjekkes (Date og Select)
    const allFilled = (): boolean => {
      return Object.values(formData).every(field => {
        if (typeof field === 'string') {
          return field.trim() !== ''; // Check if string fields are not empty
        }
        if (typeof field === 'number') {
          return field !== 0; // Assume 0 is not a valid value. Adjust if not the case.
        }
        return true; // Assumes other fields (like Date) are always valid
      });
    };

    const formatDate = (date: Date) => {
      const yyyy = date.getFullYear().toString();
      const mm = (date.getMonth() + 1).toString().padStart(2, '0');
      const dd = date.getDate().toString().padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
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
              borderBottom: '1.5px solid gray'}}>
            <h1 style={{fontWeight: 'bold'}}>About Me</h1>  
          </div>
          <div style={{marginLeft: '20%', marginRight: '20%'}}>
            <Stack spacing={10} direction="row" mt={6}>
              <FormControl>
                <FormLabel>First Name</FormLabel>
                <Input name="firstName" value={formData.firstName} onChange={handleChange} />
              </FormControl>
              <FormControl>
                <FormLabel>Last Name</FormLabel>
                <Input name="lastName" value={formData.lastName} onChange={handleChange} />
              </FormControl>
            </Stack>
            <Stack spacing={10} direction="row" mt={6}>
              <FormControl id="gender">
                <FormLabel>Gender</FormLabel>
                <Select
                  name="gender"
                  onChange={handleChange}>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="O">Other</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Birth of Date</FormLabel>
                <Input name="birthofdate" type="date" value={formatDate(formData.birthofdate)} onChange={handleChange} />
              </FormControl>
            </Stack>
            <Stack spacing={10} direction="row" mt={6}>
              <FormControl>
                <FormLabel>Height</FormLabel>
                <Input name="height" type='number' value={formData.height} onChange={handleChange} />
              </FormControl>
              <FormControl>
                <FormLabel>Weight</FormLabel>
                <Input name="weight" value={formData.weight} onChange={handleChange} />
              </FormControl>
            </Stack>
            <Stack direction="row" spacing={10} mt={10} justifyContent="center">
              <Button colorScheme="gray" onClick={() => navigate('/myprofile')}>Cancel</Button>
              <Button colorScheme="blue" disabled={!allFilled()} onClick={() => update(formData)}>Submit</Button>
            </Stack>
          </div>
        </Card>
      </>
    );
  };
  
  export default withLayout(withSpinner(EditProfilePage, 300));