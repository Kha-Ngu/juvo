import '../../styles/userProfile/Signup.css';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { setToken } from './session';

export default function Signup() {
  const nav = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [err, setErr] = useState('');

  async function submit(e) {
    e.preventDefault();
    setErr('');
    try {
      const r = await fetch('https://juvoproject.com/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data?.message || 'Sign up failed');
      if (data?.token) setToken(data.token);
      nav('/profile');
    } catch (ex) { setErr(ex.message); }
  }

  return (
    <div className="auth-wrap">
      <form className="card auth" onSubmit={submit}>
        <h3>Create your account</h3>
        <div className="stack">
          <div>
            <label>Name</label>
            <input className="input" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
          </div>
          <div>
            <label>Email</label>
            <input className="input" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
          </div>
          <div>
            <label>Password</label>
            <input className="input" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} />
          </div>
          {err && <div className="auth-error">{err}</div>}
          <button className="btn" type="submit">Sign up</button>
          <div className="auth-alt">Already have an account? <Link to="/login">Log in</Link></div>
        </div>
      </form>
    </div>
  );
}
