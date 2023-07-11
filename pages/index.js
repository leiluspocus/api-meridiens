import { useState } from 'react'
import Link from 'next/link';
import dbConnect from '../lib/dbConnect';
import Point from '../models/Point';

const Index = ({ points }) => {
  const generateInt = () => {
    return Math.ceil(Math.random() * (points.length - 1))
  }
  const [randomInt, setRandom] = useState(generateInt());
  const [display, setDisplay] = useState(false);
  const point = points[randomInt];


  const randomize = () => {
    setDisplay(false)
    setRandom(generateInt());
  }
  return (
    <>
      <button onClick={randomize}>🔮</button>
      <div key={point._id} className="main-container">
        <div className="to-guess">
          <h5 className="point-id">{point.idPoint}</h5>
          <div class="toggle" onClick={() => {setDisplay(!display); console.log(!display)}}>{display? 'Cacher' : 'Révéler'}</div>
        </div>
        {
          display &&
          <div className="card-content">
            <p className="point-name">{point.name}</p>
            <p className="localization">{point.localization}</p>
            <span><u>Rôles</u></span>
            <p className="roles">
              {point.roles !== '' ? point.roles : 'Aucun' }
            </p>
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

	return { props: { points: points } };
}

export default Index;
