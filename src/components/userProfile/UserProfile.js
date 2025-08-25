import '../../styles/userProfile/Login.css';
import { getUserIdFromToken } from '../../utility/AuthUtil';

export default function UserProfile() {
  const uid = getUserIdFromToken();
  return (
    <div className="container" style={{ paddingTop: 16 }}>
      <section className="card" style={{ padding: 18 }}>
        <h3 style={{ margin: 0 }}>Your Profile</h3>
        <p className="subtitle">User ID: {uid || 'unknown'}</p>
      </section>
    </div>
  );
}
