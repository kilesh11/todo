import { useState, useCallback } from 'react';
import { Button, CircularProgress, Tabs, Tab } from '@material-ui/core';
import { Formik, Form, Field, FormikErrors } from 'formik';
import { TextField } from 'formik-material-ui';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';

interface Values {
    name: string;
    password: string;
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
    const { setIsAuth } = useAuth();
    let history = useHistory();
    const [loginMode, setLoginMode] = useState(LoginMode.SignIn);

    const signIn = useCallback(
        async ({ name, password }: Values, { setSubmitting, setErrors }: FormikHelper) => {
            const { data } = await axios.post('/auth/login', {
                name,
                password,
            });
            if (!data.success) {
                if (data.msg === 'userNotExist') {
                    setErrors({
                        name: 'incorrect email',
                        password: '',
                    });
                } else if (data.msg === 'passwordIncorrect') {
                    setErrors({
                        name: '',
                        password: 'incorrect password',
                    });
                }
            } else {
                setIsAuth(true);
                history.push('/');
            }
            setSubmitting(false);
        },
        [setIsAuth, history],
    );

    const register = useCallback(
        async ({ name, password }: Values, { setSubmitting, setErrors }: FormikHelper) => {
            const { data } = await axios.post('/auth/register', {
                name,
                password,
            });
            if (!data.success) {
                setErrors({
                    name: 'This email already exists.',
                    password: '',
                });
            }
            setSubmitting(false);
        },
        [],
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
                            name: '',
                            password: '',
                        }}
                        validate={(values) => {
                            const errors: Partial<Values> = {};
                            if (!values.name) {
                                errors.name = 'Required';
                            } else if (!values.password) {
                                errors.password = 'Required';
                            } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.name)
                            ) {
                                errors.name = 'Invalid email address';
                            }
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting, setErrors }) => {
                            setTimeout(() => {
                                if (loginMode === LoginMode.SignIn) {
                                    signIn(values, { setSubmitting, setErrors });
                                } else if (loginMode === LoginMode.SignUp) {
                                    register(values, { setSubmitting, setErrors });
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
                                        name="name"
                                        type="email"
                                        label="Email"
                                        style={{ color: '#4E3C36', marginBottom: 20 }}
                                    />
                                    <Field
                                        component={TextField}
                                        type="password"
                                        label="Password"
                                        name="password"
                                        style={{ color: '#4E3C36', marginBottom: 60 }}
                                    />
                                    <div style={{ alignSelf: 'flex-end' }}>
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
                                                <span>Submit</span>
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
