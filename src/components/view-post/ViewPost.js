import '../../styles/view-post/ViewPost.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ViewPost() {
  const { requestId } = useParams();
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let stop = false;
    (async () => {
      try {
        const r = await fetch(`https://juvoproject.com/api/requests/${requestId}`);
        const j = await r.json();
        if (!r.ok) throw new Error('Failed to load post');
        if (stop) return;
        setPost(j);
        if (j?.userId) {
          const u = await fetch(`https://juvoproject.com/api/users/${j.userId}`);
          const uj = await u.json();
          if (!stop) setAuthor(uj);
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (!stop) setLoading(false);
      }
    })();
    return () => { stop = true; };
  }, [requestId]);

  if (loading) return <div className="container" style={{ paddingTop: 16 }}><section className="card" style={{ padding: 18 }}>Loading…</section></div>;
  if (!post)    return <div className="container" style={{ paddingTop: 16 }}><section className="card" style={{ padding: 18 }}>Post not found.</section></div>;

  return (
    <div className="container" style={{ paddingTop: 16 }}>
      <article className="card post">
        <div className="post-media">
          <img src={post.imageUrl} alt={post.title} />
        </div>
        <div className="post-body">
          <h2 style={{ marginTop: 0 }}>{post.title}</h2>
          <p className="subtitle">by {author?.name || 'Unknown'}</p>
          <p style={{ whiteSpace: 'pre-wrap' }}>{post.description}</p>
          {post.location && <p className="subtitle"><i className="fa-solid fa-location-dot" style={{ marginRight: 6 }}></i>{post.location}</p>}

          <div className="post-actions">
            <button className="btn">Make an Offer</button>
            <button className="btn btn-secondary">Message</button>
          </div>
        </div>
      </article>
    </div>
  );
}
