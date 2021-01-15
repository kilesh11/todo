import { createContext, useContext, useState, useEffect, FunctionComponent, Dispatch } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

interface IAuthContext {
    isAuth: boolean;
    isFetching: boolean;
    setIsAuth: Dispatch<boolean>;
    verify: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<IAuthContext>({
    isAuth: false,
    isFetching: true,
    setIsAuth: () => false,
    verify: async () => {},
    logout: async () => {},
});

const wrapper = (promise: Promise<any>): Promise<{ data: any; error: any }> =>
    promise.then((data) => ({ data, error: null })).catch((error) => ({ error, data: null }));

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider: FunctionComponent = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    let history = useHistory();

    const verify = async () => {
        const { data } = await wrapper(axios.get('/ui/verify'));
        setIsFetching(false);
        if (data?.data?.success) {
            setIsAuth(true);
        }
    };

    const logout = async () => {
        const { data } = await wrapper(axios.post('/auth/logout'));
        setIsFetching(false);
        if (data?.data?.success) {
            setIsAuth(false);
        }
    };

    useEffect(() => {
        verify();
    }, []);

    axios.interceptors.response.use(
        (response) => {
            if (!response?.data?.success) {
                if (['unauthorized', 'TokenExpiredError'].includes(response?.data?.msg)) {
                    console.log(
                        'kyle_debug ~ file: AuthContext.tsx ~ line 41 ~ response?.data?.msg',
                        response?.data?.msg,
                    );
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
            // return error;
        },
    );

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth, isFetching, verify, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
