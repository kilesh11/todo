import { createContext, useContext, useState, useEffect, FunctionComponent, Dispatch } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../Utility/firebase';
import { wrapper } from '../Utility/common';
import firebase from 'firebase/app';
import axios from 'axios';

interface IAuthContext {
    user: firebase.User | null;
    setUser: Dispatch<firebase.User | null>;
    register: (email: string, password: string) => Promise<void>;
    logIn: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<IAuthContext>({
    user: null,
    setUser: () => null,
    register: async () => {},
    logIn: async () => {},
});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider: FunctionComponent = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<firebase.User | null>(null);
    let history = useHistory();

    // const verify = async () => {
    //     const { data } = await wrapper(axios.get('/ui/verify'));
    //     if (data?.data?.success) {
    //         setIsLoading(false);
    //         setUser({ name: data.data.name, email: data.data.email });
    //         return true;
    //     }
    //     setIsLoading(false);
    //     return false;
    // };

    const register = async (email: string, password: string) => {
        const { error } = await wrapper(auth.createUserWithEmailAndPassword(email, password));

        if (error) {
            return Promise.reject(error);
        } else {
            history.push('/');
        }
    };

    const logIn = async (email: string, password: string) => {
        const { error } = await wrapper(auth.signInWithEmailAndPassword(email, password));

        if (error) {
            return Promise.reject(error);
        } else {
            history.push('/');
        }
    };

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, []);

    axios.interceptors.response.use(
        (response) => {
            if (!response?.data?.success) {
                if (['unauthorized', 'TokenExpiredError'].includes(response?.data?.msg)) {
                    history.push('/login');
                }
                return response;
            }
            return response;
        },
        (error) => {
            if (error.response.status === 401) {
                history.push('/login');
            }
            return error;
        },
    );

    return (
        <AuthContext.Provider value={{ setUser, register, logIn, user }}>
            {isLoading ? <span /> : children}
        </AuthContext.Provider>
    );
};
