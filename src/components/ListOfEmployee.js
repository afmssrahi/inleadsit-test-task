import React, { useRef, useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const ListOfEmployee = () => {
	const [employees, setEmployees] = useState([
		{
			name: 'rahi',
			age: 21,
			position: 'intern',
		},
	]);

	// ========== For Modal ==============
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	// ========== For Modal2 ==============
	const [show2, setShow2] = useState(false);
	let nameRef = useRef('');
	let ageRef = useRef('');
	let positionRef = useRef('');

	const handleClose2 = () => setShow2(false);
	const handleShow2 = () => setShow2(true);

	//==============  Form =================
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	// ==== for Create =====
	const onSubmit = (data) => {
		setEmployees([...employees, data]);
		handleClose();
		reset();
	};

	// ==== for delete =======
	const handleDelete = (index) => {
		employees.splice(index, 1);
		setEmployees([...employees]);
	};

	// ==== for Update =======
	const handleUpdate = (index) => {
		nameRef.current = employees[index].name;
		ageRef.current = employees[index].age;
		positionRef.current = employees[index].position;
		handleShow2();
	};

	const UpdateSubmit = (data) => {
		console.log(data);
		reset();
		handleClose2();
	};

	return (
		<div className='view'>
			<div>
				<Button
					className='btn btn-primary float-end'
					onClick={handleShow}
				>
					Add Employee
				</Button>
			</div>

			{/* For Create Employee Modal */}
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Create an employee</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form onSubmit={handleSubmit(onSubmit)}>
						<input {...register('name')} />

						<input {...register('age', { required: true })} />
						{/* errors will return when field validation fails  */}
						{errors.exampleRequired && (
							<span>This field is required</span>
						)}
						<input {...register('position')} />

						<input type='submit' />
					</form>
				</Modal.Body>
			</Modal>

			{/* For Create Employee Modal */}
			<Modal show={show2} onHide={handleClose2}>
				<Modal.Header closeButton>
					<Modal.Title>Update an employee</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form onSubmit={handleSubmit(UpdateSubmit)}>
						<input
							ref={nameRef}
							{...register('name')}
							placeholder={nameRef.current}
						/>

						<input
							ref={ageRef}
							{...register('age', { required: true })}
							placeholder={ageRef.current}
						/>
						{/* errors will return when field validation fails  */}
						{errors.exampleRequired && (
							<span>This field is required</span>
						)}
						<input
							ref={positionRef}
							{...register('position')}
							placeholder={ageRef.current}
						/>

						<input type='submit' />
					</form>
				</Modal.Body>
			</Modal>

			{employees.length !== 0 && (
				<Table className='mt-5' striped bordered hover variant='dark'>
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Age</th>
							<th>Position</th>
							<th>Delete</th>
							<th>Update</th>
						</tr>
					</thead>
					<tbody>
						{employees.map((person, index) => (
							<tr key={index}>
								<td>{index + 1}</td>
								<td>{person.name}</td>
								<td>{person.age}</td>
								<td>{person.position}</td>
								<td onClick={() => handleDelete(index)}>
									<span>&#10060;</span>
								</td>
								<td onClick={() => handleUpdate(index)}>
									<span>&#9998;</span>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</div>
	);
};

export default ListOfEmployee;
