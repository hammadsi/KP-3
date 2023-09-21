import {
  Box,
  Center,
  Container,
  Heading,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import { InputControl, SubmitButton } from 'formik-chakra-ui';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import { signInUser } from '../../state/ducks/auth/auth.actions';
import { LoginDTO } from '../../state/ducks/auth/auth.interface';
import { clearError } from '../../state/ducks/auth/auth.reducer';

const validateSchema = Yup.object({
  email: Yup.string().required().email('Email is not valid').label('Email'),
  password: Yup.string().required().label('Password'),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const { error, loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { isSignedIn } = useAppSelector((state) => state.auth);

  const signIn = (data: LoginDTO) => {
    dispatch(signInUser(data));
  };

  useEffect(() => {
    dispatch(clearError());
    if (isSignedIn) {
      navigate('/');
    }
  }, [navigate, isSignedIn]);

  return (
    <Center width="100%" height="100vh">
      <Container>
        <Container paddingTop="1em">
          <Formik
            onSubmit={async (values) => {
              signIn(values);
            }}
            initialValues={{ email: '', password: '' }}
            validationSchema={validateSchema}>
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
                      Log in{' '}
                    </Heading>
                  </Box>
                  <Box>
                    <Heading as="h3" size="lg" textAlign="center">
                      Please enter email and password to log in.
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
                  <Box>
                    <InputControl
                      isRequired
                      name="password"
                      label="Password"
                      data-testid="password-input"
                      inputProps={{
                        type: 'password',
                        autoComplete: 'password',
                        placeholder: '• • • • • • • •',
                      }}
                    />
                  </Box>
                  <Box color={'red'}>{error}</Box>
                  <Box textAlign="right">
                    <SubmitButton
                      colorScheme="primary"
                      isLoading={formProps.isSubmitting || loading}
                      isDisabled={!formProps.isValid}>
                      Log in
                    </SubmitButton>
                  </Box>
                  <Box textAlign="left">
                    <Text color="#black">
                      Not a member yet?
                      <Link color="primary.600" href="/register">
                        <b> Register!</b>
                      </Link>
                    </Text>
                  </Box>
                </VStack>
              </Box>
            )}
          </Formik>
        </Container>
      </Container>
    </Center>
  );
};

export default LoginPage;
