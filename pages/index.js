import Link from 'next/link';
import dbConnect from '../lib/dbConnect';
import Point from '../models/Point';

const Index = ({ points }) => {
	const randomInt = Math.ceil(Math.random() * (points.length - 1));
  const point = points[randomInt];
  return (
    <>
      <div key={point._id}>
        <button>🔮</button> <br />
        <div className="card">
          <h5 className="point-id">{point.idPoint}</h5>
          <div className="main-content">
            <p className="point-name">{point.name}</p>
            <p className="localization">Localisation: {point.localization}</p>
            <p className="roles">Rôles: {point.roles}</p>

            <div className="btn-container">
              <Link href="/[id]/edit" as={`/${point._id}/edit`}>
                <button className="btn edit">Edit</button>
              </Link>
              <Link href="/[id]" as={`/${point._id}`}>
                <button className="btn view">View</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

/* Retrieves point(s) data from mongodb database */
export async function getServerSideProps() {
	await dbConnect();

	/* find all the data in our database */
	const result = await Point.find({});
	const points = result.map((doc) => {
		const point = doc.toObject();
		point._id = point._id.toString();
		return point;
	});

	return { props: { points: points } };
}

export default Index;
