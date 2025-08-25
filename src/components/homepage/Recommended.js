import '../../styles/homepage/Recommended.css';
import { useEffect, useState } from 'react';
import Thumbnail from '../requests/Thumbnail';

const pickIds = [
  '680dee30047bfd1e83b9b90d',
  '680dfb0a6410970ee1ffbca9',
  '680dfeac6410970ee1ffbcac',
  '680dfc0e6410970ee1ffbcab',
  '680dfbbd6410970ee1ffbcaa',
  '680dfa606410970ee1ffbca8',
  '680df91e6410970ee1ffbca7',
  '680df8526410970ee1ffbca6',
  '680dff986410970ee1ffbcad'
];

export default function Recommended() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let stop = false;
    (async () => {
      try {
        const results = await Promise.allSettled(
          pickIds.map(id => fetch(`https://juvoproject.com/api/requests/${id}`).then(r => r.json()))
        );
        if (!stop) {
          const ok = results
            .filter(r => r.status === 'fulfilled' && r.value)
            .map(r => r.value);
          setItems(ok);
        }
      } catch {}
    })();
    return () => { stop = true; };
  }, []);

  return (
    <section className="card picks">
      <div className="section-head">
        <h3>Recommended</h3>
        <span className="subtitle">Curated picks to get you started</span>
      </div>
      <div className="picks-row">
        {items.map(it => (
          <Thumbnail
            key={it.id}
            requestId={it.id}
            image={it.imageUrl}
            title={it.title}
          />
        ))}
        {items.length === 0 && (
          <div className="subtitle" style={{ padding: 14 }}>Loading...</div>
        )}
      </div>
    </section>
  );
}
