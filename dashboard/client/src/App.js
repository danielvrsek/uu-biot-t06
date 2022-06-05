import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "./components/context/AuthContext";
import FooterNavBar from "./components/navBars/FooterNavBar";

import AuthRoute from "./components/authRoute/AuthRoute";
import TopAppBar from "./components/navBars/TopAppBar";

import routes from "./components/routes/Routes";

function App() {
    const [auth, setAuth] = useState({ user: null, userToken: null });

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
                                        <route.component></route.component>
                                    </AuthRoute>
                                ) : (
                                    <route.component />
                                )
                            }
                        ></Route>
                    ))}
                </Routes>
                <div style={{ minHeight: "100px" }}></div>
                <FooterNavBar />
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
