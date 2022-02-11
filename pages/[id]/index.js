import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import dbConnect from '../../lib/dbConnect';
import Point from '../../models/Point';

/* Allows you to view point card info and delete point card*/
const PointPage = ({ point }) => {
	const router = useRouter();
	const [ message, setMessage ] = useState('');
	const handleDelete = async () => {
		const pointID = router.query.id;

		try {
			await fetch(`/api/points/${pointID}`, {
				method: 'Delete'
			});
			router.push('/');
		} catch (error) {
			setMessage('Failed to delete the point.');
		}
	};

	return (
		<div key={point._id}>
			<div className="card">
				<img src={point.image_url} />
				<h5 className="point-name">{point.name}</h5>
				<div className="main-content">
					<p className="point-name">{point.name}</p>
					<p className="owner">Owner: {point.owner_name}</p>

					{/* Extra Point Info: Likes and Dislikes */}
					<div className="likes info">
						<p className="label">Likes</p>
						<ul>{point.likes.map((data, index) => <li key={index}>{data} </li>)}</ul>
					</div>
					<div className="dislikes info">
						<p className="label">Dislikes</p>
						<ul>{point.dislikes.map((data, index) => <li key={index}>{data} </li>)}</ul>
					</div>

					<div className="btn-container">
						<Link href="/[id]/edit" as={`/${point._id}/edit`}>
							<button className="btn edit">Edit</button>
						</Link>
						<button className="btn delete" onClick={handleDelete}>
							Delete
						</button>
					</div>
				</div>
			</div>
			{message && <p>{message}</p>}
		</div>
	);
};

export async function getServerSideProps({ params }) {
	await dbConnect();

	const point = await Point.findById(params.id).lean();
	point._id = point._id.toString();

	return { props: { point } };
}

export default PointPage;
