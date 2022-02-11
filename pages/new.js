import Form from '../components/Form';

const NewPoint = () => {
	const pointForm = {
		name: '',
		owner_name: '',
		species: '',
		age: 0,
		poddy_trained: false,
		diet: [],
		image_url: '',
		likes: [],
		dislikes: []
	};

	return <Form formId="add-point-form" pointForm={pointForm} />;
};

export default NewPoint;
