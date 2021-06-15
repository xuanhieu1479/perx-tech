import { notification } from 'antd';

const openNotification = ({
	message,
	description,
	type,
}) => {
	notification[type]({
		message: message,
		description: description,
	});
};

export default openNotification;