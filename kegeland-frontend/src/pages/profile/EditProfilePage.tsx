import { useNavigate, useParams } from 'react-router-dom';

import Card from '../../components/Card';
import withLayout from '../../hoc/withLayout';
import withSpinner from '../../hoc/withSpinner';
import useExercise from '../../hooks/useExercise';
import { Box, Container, HStack, Heading, Link, VStack } from '@chakra-ui/react';
import { Formik } from 'formik';
import { InputControl, SubmitButton } from 'formik-chakra-ui';
import useAppSelector from '../../hooks/useAppSelector';
import useAppDispatch from '../../hooks/useAppDispatch';

type FormDataUserDetails = {
  firstName: string;
  lastName: string;
};

type FormDataPatient = {
  firstName: string;
  lastName: string;
  email: string;
};


const EditProfilePage = () => {

    const { error, loading } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const { isSignedIn } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();
    
  
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
        <Container>
          <Container paddingTop="1em">
            <Formik
              onSubmit={async (values) => {
                update(values);
              }}
              initialValues={{
                firstName: '',
                lastName: '',
                gender: '',
                birthofdate: '',
                height: '',
                weight: '',
              }}
              validationSchema={validationSchema}>
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
                  }}>
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
                    <Box textAlign="right">
                      <SubmitButton
                        colorScheme="primary"
                        isLoading={formProps.isSubmitting || loading}
                        isDisabled={!formProps.isValid}>
                        Register user
                      </SubmitButton>
                    </Box>
                  </VStack>
                </Box>
              )}
            </Formik>
          </Container>
        </Container>
      </Card>
      </>
    );
  };
  
  export default withLayout(withSpinner(EditProfilePage, 300));