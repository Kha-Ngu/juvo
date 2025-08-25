import '../../styles/view-post/ViewOwnPost.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ViewOwnPost() {
  const { requestId } = useParams();
  const [post, setPost] = useState(null);
  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => {
    let stop = false;
    (async () => {
      try {
        const r = await fetch(`https://juvoproject.com/api/requests/${requestId}`);
        const j = await r.json();
        if (!r.ok) throw new Error('Failed to load post');
        if (!stop) setPost(j);
      } catch (e) { console.error(e); }
    })();
    return () => { stop = true; };
  }, [requestId]);

  async function markComplete() {
    setStatusMsg('');
    try {
      const r = await fetch(`https://juvoproject.com/api/requests/${requestId}/complete`, { method: 'POST' });
      if (!r.ok) throw new Error('Failed to complete');
      setStatusMsg('Marked as completed.');
    } catch (e) { setStatusMsg(e.message); }
  }

  async function reactivate() {
    setStatusMsg('');
    try {
      const r = await fetch(`https://juvoproject.com/api/requests/${requestId}/reactivate`, { method: 'POST' });
      if (!r.ok) throw new Error('Failed to reactivate');
      setStatusMsg('Reactivated.');
    } catch (e) { setStatusMsg(e.message); }
  }

  if (!post) return <div className="container" style={{ paddingTop: 16 }}><section className="card" style={{ padding: 18 }}>Loading…</section></div>;

  return (
    <div className="container" style={{ paddingTop: 16 }}>
      <article className="card post">
        <div className="post-media">
          <img src={post.imageUrl} alt={post.title} />
        </div>
        <div className="post-body">
          <h2 style={{ marginTop: 0 }}>{post.title}</h2>
          <p style={{ whiteSpace: 'pre-wrap' }}>{post.description}</p>
          <div className="post-actions">
            <button className="btn" onClick={markComplete}>Mark Complete</button>
            <button className="btn btn-secondary" onClick={reactivate}>Reactivate</button>
          </div>
          {statusMsg && <div className="subtitle" style={{ marginTop: 10 }}>{statusMsg}</div>}
        </div>
      </article>
    </div>
  );
}
