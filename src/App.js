import './App.css';
import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';

import Homepage from './components/homepage/Homepage';
import UserProfile from './components/userProfile/UserProfile';
import Login from './components/userProfile/Login';
import SignUp from './components/userProfile/Signup';
import CreateRequest from './components/create-requests/CreateRequest';
import ViewPost from './components/view-post/ViewPost';
import MyRequests from './components/requests/MyRequests';
import ViewOwnPost from './components/view-post/ViewOwnPost';
import PrivateRoute from './components/PrivateRoute';
import { getToken, setToken } from './components/userProfile/session';

const API_BASE = 'https://juvoproject.com/api';

function WarmupGate({ children }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let stop = false;
    (async () => {
      const deadline = Date.now() + 30000;
      while (!stop && Date.now() < deadline) {
        try {
          const r = await fetch(`${API_BASE}/requests`, { cache: 'no-store' });
          if (r.ok) { setReady(true); return; }
        } catch {}
        await new Promise(r => setTimeout(r, 1500));
      }
      setReady(true);
    })();
    return () => { stop = true; };
  }, []);

  if (!ready) {
    return (
      <div className="container" style={{ paddingTop: 40 }}>
        <header className="hero">
          <div className="nav" style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <h1 className="title" style={{ margin: 0 }}>Juvo</h1>
          </div>
          <p className="subtitle">Starting backend… this can take a few seconds on free tier.</p>
        </header>
        <section className="card" style={{ padding: 22, marginTop: 14, textAlign: 'center' }}>
          <div style={{
            width: 28, height: 28, margin: '0 auto',
            borderRadius: '50%',
            border: '3px solid var(--border)',
            borderTopColor: 'var(--primary)',
            animation: 'spin 1s linear infinite'
          }}/>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </section>
      </div>
    );
  }
  return <>{children}</>;
}

// Header moved here to keep layout consistent on every page
function TopBar() {
  const nav = useNavigate();
  const authed = !!getToken();
  const logout = () => { setToken(''); nav('/'); };

  return (
    <header className="hero">
      <div className="nav container" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <Link to="/" className="title" style={{ margin: 0 }}>Juvo</Link>
        <nav style={{ marginLeft: 'auto', display: 'flex', gap: 14 }}>
          <Link to="/">Home</Link>
          <Link to="/my-requests">My Requests</Link>
          <Link to="/create-request" className="btn" style={{ padding: '8px 12px' }}>
            <i className="fa-solid fa-plus" style={{ marginRight: 8 }}></i> New Request
          </Link>
          {authed ? (
            <>
              <Link to="/profile">Profile</Link>
              <button className="btn btn-secondary" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup" className="btn">Sign up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <div className="App">
      <Router>
        <WarmupGate>
          <TopBar />
          <main className="container" style={{ paddingBottom: 40 }}>
            <Routes>
              {/* Public */}
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/view-post/:requestId" element={<ViewPost />} />

              {/* Private */}
              <Route path="/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
              <Route path="/create-request" element={<PrivateRoute><CreateRequest /></PrivateRoute>} />
              <Route path="/my-post/:requestId" element={<PrivateRoute><ViewOwnPost /></PrivateRoute>} />
              <Route path="/my-requests" element={<PrivateRoute><MyRequests /></PrivateRoute>} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </WarmupGate>
      </Router>
    </div>
  );
}
