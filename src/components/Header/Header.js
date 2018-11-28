import React from 'react';

const Header = (props) => {	
	const Tag = props.size
	
	return (		
		<header className="header">
			<Tag>
				{props.title}
			</Tag>	
			{props.children}		
		</header>
	)	
};

export default Header;


