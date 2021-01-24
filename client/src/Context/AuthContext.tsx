import {
    createContext,
    useContext,
    useState,
    useEffect,
    FunctionComponent,
    Dispatch,
    useCallback,
} from 'react';
import { useHistory } from 'react-router-dom';
import { auth, provider } from '../Utility/firebase';
import { wrapper } from '../Utility/common';
import firebase from 'firebase/app';
import axios from 'axios';
interface IAuthContext {
    user: firebase.User | null;
    setUser: Dispatch<firebase.User | null>;
    register: (email: string, password: string) => Promise<void>;
    logIn: ({
        email,
        password,
        googleLogin,
    }: {
        email?: string;
        password?: string;
        googleLogin?: boolean;
    }) => Promise<void>;
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

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log(
                    'kyle_debug ~ file: AuthContext.tsx ~ line 49 ~ unsubscribe ~ user',
                    user,
                );
                setUser(user);
            } else {
                setUser(null);
            }
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        axios.interceptors.response.use(
            (response) => {
                if (!response?.data?.success) {
                    if (['unauthorized', 'TokenExpiredError'].includes(response?.data?.msg))
                        history.push('/login');
                    return response;
                }
                return response;
            },
            (error) => {
                if (error.response.status === 401) history.push('/login');
                return error;
            },
        );
    }, [history]);

    const register = useCallback(
        async (email: string, password: string) => {
            const { error } = await wrapper(auth.createUserWithEmailAndPassword(email, password));

            if (error) {
                return Promise.reject(error);
            } else {
                history.push('/');
            }
        },
        [history],
    );

    const logIn = useCallback(
        async ({
            email,
            password,
            googleLogin,
        }: {
            email?: string;
            password?: string;
            googleLogin?: boolean;
        }) => {
            if (googleLogin) {
                const { error } = await wrapper(firebase.auth().signInWithPopup(provider));
                console.log('kyle_debug ~ file: AuthContext.tsx ~ line 100 ~ error', error);
                if (error) {
                    return Promise.reject(error);
                }
            } else if (email && password) {
                const { error } = await wrapper(auth.signInWithEmailAndPassword(email, password));
                if (error) {
                    return Promise.reject(error);
                }
            }
            history.push('/');
        },
        [history],
    );

    return (
        <AuthContext.Provider value={{ setUser, register, logIn, user }}>
            {isLoading ? <span /> : children}
        </AuthContext.Provider>
    );
};
