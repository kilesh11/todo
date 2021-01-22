import { createContext, useContext, useState, useEffect, FunctionComponent, Dispatch } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

interface IAuthContext {
    isAuth: boolean;
    user: {
        name: string;
        email: string;
    };
    setIsAuth: Dispatch<boolean>;
    setUser: Dispatch<{ name: string; email: string }>;
    verify: () => Promise<boolean>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<IAuthContext>({
    isAuth: false,
    user: {
        name: '',
        email: '',
    },
    setUser: () => ({ name: '', email: '' }),
    setIsAuth: () => false,
    verify: async () => false,
    logout: async () => {},
});

const wrapper = (promise: Promise<any>): Promise<{ data: any; error: any }> =>
    promise.then((data) => ({ data, error: null })).catch((error) => ({ error, data: null }));

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider: FunctionComponent = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState({ name: '', email: '' });
    let history = useHistory();

    const verify = async () => {
        const { data } = await wrapper(axios.get('/ui/verify'));
        if (data?.data?.success) {
            setIsAuth(true);
            setIsLoading(false);
            setUser({ name: data.data.name, email: data.data.email });
            return true;
        }
        setIsLoading(false);
        return false;
    };

    const logout = async () => {
        const { data } = await wrapper(axios.post('/auth/logout'));
        if (data?.data?.success) {
            setIsAuth(false);
            history.push('/login');
        }
    };

    useEffect(() => {
        verify();
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
        <AuthContext.Provider value={{ isAuth, setIsAuth, setUser, verify, logout, user }}>
            {isLoading ? <span /> : children}
        </AuthContext.Provider>
    );
};
