import {
  Box,
  Center,
  Container,
  FormControl,
  Checkbox,
  FormLabel,
  Heading,
  HStack,
  Link,
  Select,
  VStack,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { InputControl, SubmitButton } from 'formik-chakra-ui';

import { signUpUser } from '../../state/ducks/auth/auth.actions';
import {
  PatientType,
  RegisterDTO,
  UserRole,
} from '../../state/ducks/auth/auth.interface';
import { clearError } from '../../state/ducks/auth/auth.reducer';
import useAppSelector from '../../hooks/useAppSelector';
import useAppDispatch from '../../hooks/useAppDispatch';

type Gender = 'M' | 'F' | 'O';
type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  patientType: PatientType[];
  gender: Gender;
  birthdate: string;
  height: number;
  weight: number;
  password: string;
  confirmPassword: string;
};

const validationSchema = Yup.object({
  email: Yup.string().required().email('Email is not valid').label('Email'),
  firstName: Yup.string().required().label('First name'),
  lastName: Yup.string().required().label('Last name'),
  password: Yup.string().required().label('Password'),
  confirmPassword: Yup.string().when('password', {
    is: (val: string | any[]) => !!(val && val.length > 0),
    then: Yup.string().oneOf(
      [Yup.ref('password')],
      'Both passwords need to be the same',
    ),
  }),
});

const RegisterPage = () => {
  const { error, loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { isSignedIn } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearError());
    if (isSignedIn) {
      navigate('/');
    }
  }, [navigate, isSignedIn]);

  const register = (data: FormData) => {
    const {
      firstName,
      lastName,
      email,
      password,
      patientType,
      gender,
      birthdate,
      height,
      weight,
    } = data;
    const payload: RegisterDTO = {
      email,
      password,
      name: {
        firstName,
        lastName,
      },
      roles: [UserRole.PATIENT],
      patientType,
      wheelchairPatient: {
        birthdate,
        gender,
        currentPhysicalState: {
          height,
          weight,
          maxHeartRate: 0,
          averageHeartRate: 0,
          maxWheelchairSpeed: 0,
          averageWheelchairSpeed: 0,
        },
        gameSessions: [],
        id: '',
        name: `${firstName} ${lastName}`,
      },
    };
    dispatch(signUpUser(payload));
  };

  return (
    <div>
      <Center width="100%" height="100vh">
        <Container>
          <Container paddingTop="1em">
            <Formik
              onSubmit={async (values) => {
                register(values);
              }}
              initialValues={{
                email: '',
                password: '',
                patientType: [] as PatientType[],
                firstName: '',
                lastName: '',
                birthdate: '',
                gender: 'O' as Gender,
                height: 0,
                weight: 0,
                confirmPassword: '',
              }}
              validationSchema={validationSchema}
            >
              {(formProps) => (
                <Box
                  borderWidth="1px"
                  rounded="lg"
                  shadow="1px 1px 3px rgba(0,0,0,0.3)"
                  maxWidth={800}
                  p={6}
                  m="10px auto"
                  as="form"
                  onSubmit={(e: any) => {
                    e.preventDefault();
                    formProps.handleSubmit();
                  }}
                >
                  <VStack spacing={5} align="stretch">
                    <Box>
                      <Heading as="h3" size="lg" textAlign="center">
                        Register
                      </Heading>
                    </Box>
                    <Box>
                      <Heading as="h3" size="lg" textAlign="center">
                        Please enter email and password to create a user.
                      </Heading>
                    </Box>
                    <Box>
                      <InputControl
                        inputProps={{
                          type: 'email',
                          placeholder: 'ola.nordmann@example.com',
                        }}
                        name="email"
                        isRequired
                        label="Email address"
                        data-testid="email-input"
                      />
                    </Box>
                    <HStack justifyContent="space-between" w="100%">
                      <Box>
                        <InputControl
                          inputProps={{
                            type: 'text',
                            placeholder: 'Ola',
                          }}
                          name="firstName"
                          isRequired
                          label="First name"
                          data-testid="firstname-input"
                        />
                      </Box>
                      <Box>
                        <InputControl
                          inputProps={{
                            type: 'text',
                            placeholder: 'Nordmann',
                          }}
                          isRequired
                          label="Last name"
                          data-testid="lastname-input"
                          name="lastName"
                        />
                      </Box>
                    </HStack>
                    <HStack w="100%">
                      <Box style={{ marginRight: '14%' }}>
                        <FormControl id="gender">
                          <FormLabel>Gender</FormLabel>
                          <Select
                            name="gender"
                            onChange={(e) =>
                              formProps.setFieldValue('gender', e.target.value)
                            }
                          >
                            <option value="O" disabled>
                              Select gender
                            </option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                            <option value="O">Other</option>
                          </Select>
                        </FormControl>
                      </Box>
                      <Box>
                        <InputControl
                          inputProps={{
                            type: 'date',
                          }}
                          label="Date of birth"
                          data-testid="lastname-input"
                          name="birthdate"
                        />
                      </Box>
                    </HStack>
                    <HStack justifyContent="space-between" w="100%">
                      <Box>
                        <InputControl
                          inputProps={{
                            type: 'number',
                          }}
                          name="height"
                          label="Height (cm)"
                          data-testid="firstname-input"
                        />
                      </Box>
                      <Box>
                        <InputControl
                          inputProps={{
                            type: 'number',
                          }}
                          label="Weight (kg)"
                          data-testid="lastname-input"
                          name="weight"
                        />
                      </Box>
                    </HStack>

                    <Box>
                      <FormControl>
                        <FormLabel>What training tools will you use?</FormLabel>
                        <Checkbox
                          name="patientType"
                          value={PatientType.FEMFIT}
                          isChecked={formProps.values.patientType.includes(
                            PatientType.FEMFIT,
                          )}
                          onChange={(e) => {
                            if (e.target.checked) {
                              formProps.setFieldValue('patientType', [
                                ...formProps.values.patientType,
                                PatientType.FEMFIT,
                              ]);
                            } else {
                              formProps.setFieldValue(
                                'patientType',
                                formProps.values.patientType.filter(
                                  (type) => type !== PatientType.FEMFIT,
                                ),
                              );
                            }
                          }}
                        >
                          Femfit
                        </Checkbox>
                      </FormControl>
                      <FormControl>
                        <Checkbox
                          name="patientType"
                          value={PatientType.WHEELCHAIR}
                          isChecked={formProps.values.patientType.includes(
                            PatientType.WHEELCHAIR,
                          )}
                          onChange={(e) => {
                            if (e.target.checked) {
                              formProps.setFieldValue('patientType', [
                                ...formProps.values.patientType,
                                PatientType.WHEELCHAIR,
                              ]);
                            } else {
                              formProps.setFieldValue(
                                'patientType',
                                formProps.values.patientType.filter(
                                  (type) => type !== PatientType.WHEELCHAIR,
                                ),
                              );
                            }
                          }}
                        >
                          Wheelchair
                        </Checkbox>
                      </FormControl>
                    </Box>

                    <Box>
                      <InputControl
                        isRequired
                        name="password"
                        label="Password"
                        data-testid="password-input"
                        inputProps={{
                          type: 'password',
                          autoComplete: 'new-password',
                          placeholder: '• • • • • • • •',
                        }}
                        helperText="Create a new password."
                      />
                    </Box>
                    <Box>
                      <InputControl
                        isRequired
                        name="confirmPassword"
                        data-testid="confirmPassword-input"
                        inputProps={{
                          type: 'password',
                          autoComplete: 'new-password',
                          placeholder: '• • • • • • • •',
                        }}
                        helperText="Repeat your password."
                      />
                    </Box>
                    <Box color={'red'}>{error}</Box>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Box textAlign="left" marginTop="9px">
                        <Link color="grey" href="/login">
                          <b>Cancel</b>
                        </Link>
                      </Box>
                      <Box textAlign="right">
                        <SubmitButton
                          colorScheme="primary"
                          isLoading={formProps.isSubmitting || loading}
                          isDisabled={!formProps.isValid}
                        >
                          Register user
                        </SubmitButton>
                      </Box>
                    </div>
                  </VStack>
                </Box>
              )}
            </Formik>
          </Container>
        </Container>
      </Center>
    </div>
  );
};

export default RegisterPage;
