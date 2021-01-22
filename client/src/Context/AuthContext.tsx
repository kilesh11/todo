import { createContext, useContext, useState, useEffect, FunctionComponent, Dispatch } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../Utility/firebase';
import { wrapper } from '../Utility/common';
import firebase from 'firebase/app';
import axios from 'axios';

interface IAuthContext {
    isAuth: boolean;
    user: firebase.User | null;
    setIsAuth: Dispatch<boolean>;
    setUser: Dispatch<firebase.User | null>;
    register: (email: string, password: string) => Promise<void>;
    logIn: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<IAuthContext>({
    isAuth: false,
    user: null,
    setUser: () => null,
    setIsAuth: () => false,
    register: async () => {},
    logIn: async () => {},
});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider: FunctionComponent = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<firebase.User | null>(null);
    let history = useHistory();

    // const verify = async () => {
    //     const { data } = await wrapper(axios.get('/ui/verify'));
    //     if (data?.data?.success) {
    //         setIsAuth(true);
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
        firebase.auth().onAuthStateChanged(function (user) {
            console.log('kyle_debug ~ file: AuthContext.tsx ~ line 74 ~ user', user);
            if (user) {
                setUser(user);
                setIsLoading(false);
            } else {
                setUser(null);
                setIsLoading(false);
            }
        });
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
        <AuthContext.Provider value={{ isAuth, setIsAuth, setUser, register, logIn, user }}>
            {isLoading ? <span /> : children}
        </AuthContext.Provider>
    );
};
