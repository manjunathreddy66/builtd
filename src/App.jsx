import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Editor from './pages/Editor';
import Explore from './pages/Explore';
import PublicPortfolio from './pages/PublicPortfolio';
import NotFound from './pages/NotFound';

export const App = () => {
  const location = useLocation();

  // The public portfolio route (e.g. /arjun) should render as a standalone personal website
  // without the BUILTD platform header/footer, while platform pages show the BUILTD header/footer.
  const isPlatformRoute = [
    '/',
    '/login',
    '/signup',
    '/dashboard',
    '/editor',
    '/explore'
  ].includes(location.pathname);

  const isOnboarding = location.pathname === '/onboarding';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Show platform Navbar on platform pages, except during full-focus onboarding */}
      {isPlatformRoute && !isOnboarding && <Navbar />}

      <div style={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/explore" element={<Explore />} />

          {/* Dynamic route: /:username renders student's public portfolio */}
          <Route path="/:username" element={<PublicPortfolio />} />

          {/* Catch-all 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {/* Show platform Footer on platform pages, except onboarding */}
      {isPlatformRoute && !isOnboarding && <Footer />}
      
      {/* Vercel Speed Insights */}
      <SpeedInsights />
    </div>
  );
};

export default App;
