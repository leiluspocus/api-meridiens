import Form from '../components/Form';

const NewPoint = () => {
	const pointForm = {
		name: '',
		idName: '',
		localization: '',
		roles: ''
	};

	return <Form formId="add-point-form" pointForm={pointForm} />;
};

export default NewPoint;
