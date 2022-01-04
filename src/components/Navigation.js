import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
	return (
		<div className='Navigation'>
			<Nav defaultActiveKey='/home' className='flex-column'>
				<Nav.Link as={NavLink} to='/employee'>
					List of Employee
				</Nav.Link>
				<Nav.Link as={NavLink} to='/category'>
					List of Category
				</Nav.Link>
			</Nav>
		</div>
	);
};

export default Navigation;
