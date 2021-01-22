import { useState, useCallback } from 'react';
import { Button, CircularProgress, Tabs, Tab } from '@material-ui/core';
import { Formik, Form, Field, FormikErrors } from 'formik';
import { TextField } from 'formik-material-ui';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { wrapper } from '../Utility/common';
import { useAuth } from '../Context/AuthContext';

interface Values {
    email: string;
    password: string;
    confirmPassword: string;
}

interface FormikHelper {
    setSubmitting: (isSubmitting: boolean) => void;
    setErrors: (error: FormikErrors<Values>) => void;
}

enum LoginMode {
    SignIn,
    SignUp,
}

const Login = () => {
    const { setIsAuth, setUser, register } = useAuth();
    let history = useHistory();
    const [loginMode, setLoginMode] = useState(LoginMode.SignIn);

    const signIn = useCallback(
        async ({ email, password }: Values, { setSubmitting, setErrors }: FormikHelper) => {
            const { data } = await axios.post('/auth/login', {
                email,
                password,
            });
            if (!data.success) {
                if (data.msg === 'userNotExist') {
                    setErrors({
                        email: 'incorrect email',
                        password: '',
                    });
                } else if (data.msg === 'passwordIncorrect') {
                    setErrors({
                        email: '',
                        password: 'incorrect password',
                    });
                }
            } else {
                setIsAuth(true);
                setUser(data.data);
                history.push('/');
            }
            setSubmitting(false);
        },
        [setIsAuth, setUser, history],
    );

    const signUp = useCallback(
        async ({ email, password }: Values, { setSubmitting, setErrors }: FormikHelper) => {
            const { error } = await wrapper(register(email, password));
            if (error) {
                let errorMsg = {
                    email: '',
                    password: '',
                    confirmpassword: '',
                };
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        errorMsg.email = 'This email already exists.';
                        break;
                    case 'auth/invalid-email':
                        errorMsg.email = 'This email is invalid.';
                        break;
                    case 'auth/weak-password':
                        errorMsg.password = 'Password is too weak';
                        break;
                }
                setErrors(errorMsg);
            }
            setSubmitting(false);
        },
        [register],
    );

    return (
        <div
            style={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#EAE7DC',
            }}
        >
            <div
                style={{
                    width: '20vw',
                    minWidth: '400px',
                    backgroundColor: 'white',
                    borderRadius: '15px',
                    boxShadow: '3px 3px #8E8D8A',
                }}
            >
                <div
                    style={{
                        height: 'inherited',
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                            confirmPassword: '',
                        }}
                        validate={(values) => {
                            const errors: Partial<Values> = {};
                            if (!values.email) {
                                errors.email = 'Required';
                            } else if (!values.password) {
                                errors.password = 'Required';
                            } else if (!values.confirmPassword && loginMode === LoginMode.SignUp) {
                                errors.confirmPassword = 'Required';
                            } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
                            ) {
                                errors.email = 'Invalid email address';
                            } else if (
                                values.confirmPassword !== values.password &&
                                loginMode === LoginMode.SignUp
                            ) {
                                errors.password = 'Password did not match with Confirm Password';
                                errors.confirmPassword =
                                    'Password did not match with Confirm Password';
                            }
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting, setErrors }) => {
                            setTimeout(() => {
                                if (loginMode === LoginMode.SignIn) {
                                    signIn(values, { setSubmitting, setErrors });
                                } else if (loginMode === LoginMode.SignUp) {
                                    signUp(values, { setSubmitting, setErrors });
                                }
                            }, 1000);
                        }}
                    >
                        {({ submitForm, isSubmitting, resetForm }) => (
                            <Form>
                                <div
                                    style={{
                                        display: 'flex',
                                        marginBottom: 20,
                                    }}
                                >
                                    <Tabs
                                        value={loginMode}
                                        indicatorColor="primary"
                                        textColor="primary"
                                        onChange={(e, newValue) => {
                                            if (newValue !== loginMode) resetForm();
                                            setLoginMode(newValue);
                                        }}
                                        aria-label="disabled tabs example"
                                    >
                                        <Tab label="Sign in" />
                                        <Tab label="Sign up" />
                                    </Tabs>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Field
                                        component={TextField}
                                        name="email"
                                        type="email"
                                        label="Email"
                                        style={{ color: '#4E3C36', marginBottom: 20 }}
                                    />
                                    <Field
                                        component={TextField}
                                        type="password"
                                        label="Password"
                                        name="password"
                                        autoComplete="off"
                                        style={{ color: '#4E3C36', marginBottom: 20 }}
                                    />
                                    {loginMode === LoginMode.SignUp && (
                                        <Field
                                            component={TextField}
                                            name="confirmPassword"
                                            type="password"
                                            label="Confirm Password"
                                            autoComplete="off"
                                            style={{
                                                color: '#4E3C36',
                                                marginBottom: 20,
                                            }}
                                        />
                                    )}
                                    <div style={{ alignSelf: 'flex-end', marginTop: 40 }}>
                                        <Button
                                            disabled={isSubmitting}
                                            type="submit"
                                            onClick={submitForm}
                                            style={{
                                                width: '100px',
                                                height: '35px',

                                                backgroundColor: '#E85A4F',
                                                color: 'white',
                                            }}
                                        >
                                            {isSubmitting ? (
                                                <CircularProgress
                                                    style={{
                                                        color: 'white',
                                                        width: '25px',
                                                        height: '25px',
                                                    }}
                                                />
                                            ) : (
                                                <span>
                                                    {loginMode === LoginMode.SignUp
                                                        ? 'Register'
                                                        : 'Submit'}
                                                </span>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default Login;
