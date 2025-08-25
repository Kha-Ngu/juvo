import '../../styles/requests/MyRequests.css';
import Requests from './Requests';
import { getUserIdFromToken } from '../../utility/AuthUtil';
import { useNavigate } from 'react-router-dom';

export default function MyRequests() {
  const nav = useNavigate();
  const userId = getUserIdFromToken();
  if (!userId) { nav('/login'); return null; }

  return (
    <div className="stack" style={{ gap: 16 }}>
      <Requests
        header="My Active Requests"
        endpoint={`https://juvoproject.com/api/requests/user/${userId}`}
        toggleable
        isMine
      />
      <Requests
        header="Completed Requests"
        endpoint={`https://juvoproject.com/api/requests/user/${userId}/completed`}
        toggleable
        isMine
      />
    </div>
  );
}
