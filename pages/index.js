import { useState } from 'react'
import Link from 'next/link';
import dbConnect from '../lib/dbConnect';
import Point from '../models/Point';

const generateInt = (points) => {
  if (points === undefined) {
    return 0;
  }
  return Math.ceil(Math.random() * (points.length - 1))
}

const Index = ({ points, ssrGeneratedInt }) => {

  const [randomInt, setRandom] = useState(ssrGeneratedInt);
  const [display, setDisplay] = useState(false);
  const randomize = () => {
    setDisplay(false)
    setRandom(generateInt(points));
  }

  return (
    <>
      <button onClick={randomize}>🔮</button>
      <div key={points[randomInt]._id} className="main-container">
        <div className="to-guess">
          <h5 className="point-id">{points[randomInt].idPoint}</h5>
          <div className="toggle" onClick={() => {setDisplay(!display);}}>{display? 'Cacher' : 'Révéler'}</div>
        </div>
        {
          display &&
          <div className="card-content">
            <p className="point-name">{points[randomInt].name}</p>
            <p className="localization">{points[randomInt].localization}</p>
            <span><u>Rôles</u></span>
            <p className="roles">
              {points[randomInt].roles !== '' ? points[randomInt].roles : 'Aucun' }
            </p>
            <Link href="/[id]/edit" as={`/${points[randomInt]._id}/edit`}>
              <button className="btn edit">Editer</button>
            </Link>
          </div>
        }
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

	return { props: { points: points, ssrGeneratedInt: generateInt(points) } };
}

export default Index;
