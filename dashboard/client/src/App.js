import { useState, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from './components/context/UserContext';
import FooterNavBar from './components/navBars/FooterNavBar';

import TopAppBar from './components/navBars/TopAppBar';

import routes from './components/routes/Routes';

function App() {
  const [user, setUser] = useState(null);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <UserContext.Provider value={value}>
      <BrowserRouter>
        <TopAppBar />
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              element={<route.component />}
            ></Route>
          ))}
        </Routes>
        <div style={{ minHeight: '100px' }}></div>
        <FooterNavBar />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
