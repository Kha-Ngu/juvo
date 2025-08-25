import '../../styles/homepage/Homepage.css';
import Recommended from './Recommended';
import Requests from '../requests/Requests';

export default function Homepage() {
  return (
    <div className="homepage stack" style={{ paddingTop: 12 }}>
      <section className="card" style={{ padding: 18 }}>
        <h2 style={{ margin: 0 }}>Find the help you need</h2>
        <p className="subtitle" style={{ marginTop: 6 }}>
          Browse nearby requests or create your own. Real people, real help.
        </p>
      </section>

      <Recommended />

      <Requests
        header="All Requests Near You"
        endpoint="https://juvoproject.com/api/requests"
        toggleable
      />
    </div>
  );
}
