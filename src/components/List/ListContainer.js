import React from 'react';
import { List } from 'antd';
import './style.scss'

const ListContainer = ({ data, headerText }) => {
	return (
		<article className="main-page__list">
			<List
				size="small"
				header={<div>{headerText}</div>}
				bordered
				dataSource={data}
				renderItem={item => <List.Item><a href={item.url}>{item.name}</a></List.Item>}
			/>
		</article>
	);
};

export default ListContainer;