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
import { CreateUserIfNotExistDocument } from '../generated/graphql';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { TypedTypePolicies } from '../generated/type-policies';
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

const httpLink = createHttpLink({
    uri: `${process.env.REACT_APP_GRAPHQL_URL ?? ''}/graphql`,
});

const typePolicies: TypedTypePolicies = {
    Todo: {
        keyFields: ['id'],
    },
    User: {
        keyFields: ['email'],
    },
    Query: {
        fields: {
            getTodoByUid: {
                merge(existing, incoming) {
                    return incoming;
                },
            },
        },
    },
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider: FunctionComponent = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<firebase.User | null>(null);
    const [apolloClient, setApolloClient] = useState(
        new ApolloClient({
            link: httpLink,
            cache: new InMemoryCache({ typePolicies }),
        }),
    );
    let history = useHistory();

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                const token = await user?.getIdToken();
                await apolloClient.mutate({
                    mutation: CreateUserIfNotExistDocument,
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
                const authLink = setContext((_, previousContext) => {
                    return {
                        headers: {
                            ...previousContext.headers,
                            authorization: `Bearer ${token}`,
                        },
                    };
                });
                setApolloClient(
                    new ApolloClient({
                        link: authLink.concat(httpLink),
                        cache: new InMemoryCache({ typePolicies }),
                    }),
                );
                setUser(user);
                history.push('/');
            } else {
                setUser(null);
            }
            setIsLoading(false);
        });
        return () => unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const register = useCallback(async (email: string, password: string) => {
        const { error } = await wrapper(auth.createUserWithEmailAndPassword(email, password));

        if (error) {
            return Promise.reject(error);
        }
    }, []);

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
        },
        [],
    );

    return (
        <AuthContext.Provider value={{ setUser, register, logIn, user }}>
            <ApolloProvider client={apolloClient}>{isLoading ? <span /> : children}</ApolloProvider>
        </AuthContext.Provider>
    );
};
