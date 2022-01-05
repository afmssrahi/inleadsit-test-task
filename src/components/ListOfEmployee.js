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
	let idRef = useRef('');
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
		reset();
		idRef.current = index;
		nameRef.current = employees[index].name;
		ageRef.current = employees[index].age;
		positionRef.current = employees[index].position;
		handleShow2();
	};

	const UpdateSubmit = (data) => {
		employees[data.id - 1].name = data.name;
		employees[data.id - 1].age = data.age;
		employees[data.id - 1].position = data.position;
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
					<form
						className='formModal'
						onSubmit={handleSubmit(onSubmit)}
					>
						<label>Name:</label>
						<br />
						<input {...register('name')} /> <br />
						{/* errors will return when field validation fails  */}
						{errors.name && <span>This field is required</span>}
						<label>age:</label>
						<br />
						<input {...register('age', { required: true })} />
						<br />
						{/* errors will return when field validation fails  */}
						{errors.age && <span>This field is required</span>}
						<label>position:</label>
						<br />
						<input {...register('position')} />
						<br />
						{/* errors will return when field validation fails  */}
						{errors.position && (
							<span>This field is required</span>
						)}{' '}
						<br />
						<input className='btn btn-primary' type='submit' />
					</form>
				</Modal.Body>
			</Modal>

			{/* For Update Employee Modal */}
			<Modal show={show2} onHide={handleClose2}>
				<Modal.Header closeButton>
					<Modal.Title>Update an employee</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form
						className='formModal'
						onSubmit={handleSubmit(UpdateSubmit)}
					>
						<label>Id:</label>
						<br />
						<input
							value={idRef.current + 1}
							ref={idRef}
							{...register('id')}
							placeholder={idRef.current}
						/>
						<br />
						<label>Name:</label>
						<br />
						<input
							ref={nameRef}
							{...register('name')}
							placeholder={nameRef.current}
						/>
						<br />
						<label>Age:</label>
						<br />
						<input
							ref={ageRef}
							{...register('age', { required: true })}
							placeholder={ageRef.current}
						/>
						<br />
						{/* errors will return when field validation fails  */}
						{errors.exampleRequired && (
							<span>This field is required</span>
						)}
						<label>Position:</label>
						<br />
						<input
							ref={positionRef}
							{...register('position')}
							placeholder={positionRef.current}
						/>
						<br />
						<br />

						<input className='btn btn-primary' type='submit' />
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
