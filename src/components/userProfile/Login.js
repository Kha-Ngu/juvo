import '../../styles/userProfile/Login.css';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { setToken } from './session';

export default function Login() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [err, setErr] = useState('');

  async function submit(e) {
    e.preventDefault();
    setErr('');
    try {
      const r = await fetch('https://juvoproject.com/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data?.message || 'Login failed');
      if (data?.token) setToken(data.token);
      nav('/profile');
    } catch (ex) { setErr(ex.message); }
  }

  return (
    <div className="auth-wrap">
      <form className="card auth" onSubmit={submit}>
        <h3>Welcome back</h3>
        <div className="stack">
          <div>
            <label>Email</label>
            <input className="input" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
          </div>
          <div>
            <label>Password</label>
            <input className="input" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} />
          </div>
          {err && <div className="auth-error">{err}</div>}
          <button className="btn" type="submit">Log in</button>
          <div className="auth-alt">No account? <Link to="/signup">Sign up</Link></div>
        </div>
      </form>
    </div>
  );
}
