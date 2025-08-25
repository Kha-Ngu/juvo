import '../../styles/create-requests/CreateRequest.css';
import { useState } from 'react';

export default function CreateRequest() {
  const [form, setForm] = useState({
    title: '', description: '', imageUrl: '', location: ''
  });
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState('');

  async function uploadToCloudinary(f) {
    const data = new FormData();
    data.append('file', f);
    data.append('upload_preset', 'ml_default'); // adjust if you use a different preset
    const r = await fetch('https://api.cloudinary.com/v1_1/dg1dhp4g3/image/upload', { method: 'POST', body: data });
    const j = await r.json();
    if (!r.ok) throw new Error(j?.error?.message || 'upload failed');
    return j.secure_url;
  }

  async function submit(e) {
    e.preventDefault();
    setMsg('');
    try {
      let imageUrl = form.imageUrl;
      if (file) imageUrl = await uploadToCloudinary(file);

      const payload = { ...form, imageUrl };
      const r = await fetch('https://juvoproject.com/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j?.message || 'Create failed');
      setMsg('Request created!');
      setForm({ title:'', description:'', imageUrl:'', location:'' });
      setFile(null);
    } catch (ex) {
      setMsg(ex.message);
    }
  }

  return (
    <div className="container" style={{ paddingTop: 16 }}>
      <form className="card create" onSubmit={submit}>
        <h3 style={{ margin: 0 }}>Create a request</h3>
        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <div className="stack">
            <div>
              <label>Title</label>
              <input className="input" value={form.title} onChange={e=>setForm({...form, title:e.target.value})}/>
            </div>
            <div>
              <label>Description</label>
              <textarea rows={8} value={form.description} onChange={e=>setForm({...form, description:e.target.value})}/>
            </div>
            <div>
              <label>Location</label>
              <input className="input" value={form.location} onChange={e=>setForm({...form, location:e.target.value})}/>
            </div>
          </div>
          <div className="stack">
            <div>
              <label>Image (URL)</label>
              <input className="input" value={form.imageUrl} onChange={e=>setForm({...form, imageUrl:e.target.value})}/>
            </div>
            <div>
              <label>Or upload file</label>
              <input type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0] || null)}/>
            </div>
            <button className="btn" type="submit">Publish</button>
            {msg && <div className="subtitle">{msg}</div>}
          </div>
        </div>
      </form>
    </div>
  );
}
