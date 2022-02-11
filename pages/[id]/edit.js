import { useRouter } from 'next/router';
import useSWR from 'swr';
import Form from '../../components/Form';

const fetcher = (url) => fetch(url).then((res) => res.json()).then((json) => json.data);

const EditPoint = () => {
	const router = useRouter();
	const { id } = router.query;
	const { data: point, error } = useSWR(id ? `/api/points/${id}` : null, fetcher);

	if (error) return <p>Failed to load</p>;
	if (!point) return <p>Loading...</p>;

	const pointForm = {
		idPoint: point.idPoint,
		name: point.name,
		localization: point.localization,
		roles: point.roles
	};

	return <Form formId="edit-point-form" pointForm={pointForm} forNewPoint={false} />;
};

export default EditPoint;
