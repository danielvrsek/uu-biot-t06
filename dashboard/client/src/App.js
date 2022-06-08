import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthContext } from './components/context/AuthContext';
import FooterNavBar from './components/navBars/FooterNavBar';

import AuthRoute from './components/authRoute/AuthRoute';
import TopAppBar from './components/navBars/TopAppBar';

import routes from './components/routes/Routes';
import ApiClient from './api/ApiClient';

function App() {
    const [auth, setAuth] = useState({ user: null });
    const [isInitialized, setIsInitialized] = useState(false);
    useEffect(() => {
        ApiClient.getUserInfo().then((res) => {
            if (res.status !== 401) setAuth({ user: res.data });
            setIsInitialized(true);
        }).catch(() => setIsInitialized(true));
    }, [setAuth]);

    if (!isInitialized) {
        return <div></div>;
    }

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            <BrowserRouter>
                <TopAppBar />
                <Routes>
                    {routes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            element={
                                route.protected ? (
                                    <AuthRoute>
                                        <route.component />
                                    </AuthRoute>
                                ) : (
                                    <route.component />
                                )
                            }
                        ></Route>
                    ))}
                </Routes>
                <div style={{ minHeight: '100px' }}></div>
                <FooterNavBar />
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
