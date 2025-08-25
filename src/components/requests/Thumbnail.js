import '../../styles/requests/Thumbnail.css';
import { useNavigate } from 'react-router-dom';

export default function Thumbnail({ requestId, image, title, isMine }) {
  const nav = useNavigate();
  const go = () => nav(isMine ? `/my-post/${requestId}` : `/view-post/${requestId}`);

  return (
    <div className="thumbnail card">
      <div className="thumb-img">
        <img src={image} alt={title} onClick={go} />
      </div>
      <div className="thumb-body">
        <h4 onClick={go} title={title}>{title}</h4>
        <button className="btn btn-secondary" onClick={go}>Open</button>
      </div>
    </div>
  );
}
