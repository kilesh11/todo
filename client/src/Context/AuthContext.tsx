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
import { useCreateUserIfNotExistMutation } from '../generated/graphql';
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
    const [createUserIfNotExist] = useCreateUserIfNotExistMutation();
    let history = useHistory();

    useEffect(() => {
        console.log('kyle_debug ~ file: AuthContext.tsx ~ line 72 ~ useEffect didmount');
        const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                setUser(user);
                const token = await user?.getIdToken();
                await createUserIfNotExist({
                    variables: {
                        user: {
                            uid: user?.uid,
                            email: user?.email,
                            name: user?.displayName ?? '',
                        },
                    },
                    context: {
                        headers: {
                            authorization: `Bearer ${token}`,
                        },
                    },
                });
            } else {
                setUser(null);
            }
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, [createUserIfNotExist]);

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

    // const setAuthorizationLink = setContext(async (request, previousContext) => {
    //     const token = user && (await user.getIdToken());
    //     console.log(
    //         'kyle_debug ~ file: AuthContext.tsx ~ line 128 ~ setAuthorizationLink ~ user',
    //         user?.email,
    //     );
    //     return {
    //         headers: {
    //             ...previousContext.headers,
    //             authorization: `Bearer ${token}`,
    //         },
    //     };
    // });

    return (
        <AuthContext.Provider value={{ setUser, register, logIn, user }}>
            {isLoading ? <span /> : children}
        </AuthContext.Provider>
    );
};
