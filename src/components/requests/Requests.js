import '../../styles/requests/Requests.css';
import Thumbnail from './Thumbnail';
import { getUserIdFromToken } from '../../utility/AuthUtil';
import { useEffect, useState } from 'react';

export default function Requests({ header, endpoint, toggleable = false, isMine = false }) {
  const [requests, setRequests] = useState([]);
  const [visible, setVisible] = useState(true);
  const userId = getUserIdFromToken();

  useEffect(() => {
    let stop = false;
    async function run() {
      try {
        const r = await fetch(endpoint);
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const data = await r.json();
        if (!stop) setRequests(Array.isArray(data) ? data : (data?.content || []));
      } catch (e) {
        console.error(e);
        if (!stop) setRequests([]);
      }
    }
    run();
    return () => { stop = true; };
  }, [endpoint]);

  return (
    <section className="card">
      <div className="req-head">
        <h3>{header}</h3>
        {toggleable && (
          <button className="btn btn-secondary" onClick={() => setVisible(v => !v)}>
            {visible ? 'Hide' : 'Show'}
          </button>
        )}
      </div>

      {visible && (
        <div className="req-grid">
          {requests.map(item => (
            <Thumbnail
              key={item.id}
              requestId={item.id}
              image={item.imageUrl}
              title={item.title}
              isMine={isMine && userId === item.userId}
            />
          ))}
          {requests.length === 0 && <div className="subtitle" style={{ padding: 10 }}>No requests found.</div>}
        </div>
      )}
    </section>
  );
}
