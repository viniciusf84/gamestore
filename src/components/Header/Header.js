import React from 'react';

export default function Header(props) {	
	const Tag = props.size;
	
	return (		
		<header className="header">
			<Tag>
				{props.title}
			</Tag>	
			{props.children}		
		</header>
	)	
};


