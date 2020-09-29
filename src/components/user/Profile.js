import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EditForm from './EditForm';
import axios from 'axios';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Profile = (props) => {
	let [currentForm, setForm] = useState('Edit User');
	let [user, setUser] = useState('');
	let [userId, setUserId] = useState('');
    console.log({ props });
    
	const userData = props.user ? (
		<div>
			<h1>Profile</h1>
            <div className="hikesList">
			<p>
				{user.name} info:
			</p>
			<p>
				<strong>Email:</strong> {props.user.email}
			</p>
			{/* <p className="id" name="id">
				<strong>ID:</strong> {props.user.id}
			</p> */}
			<p>
				<strong>Longitude:</strong> {user.longitude}
			</p>
			<p>
				<strong>Latitude:</strong> {user.latitude}
			</p>
			<p>
				<strong>Distance from Trails:</strong> {user.radiusTrail}
			</p>
            </div>
			{/* <input
				type="button"
				onClick={() =>
					({ currentForm } = 'Edit User')
						? (setForm((currentForm = 'Cancel')), console.log({ currentForm }))
						: (setForm((currentForm = 'Edit User')),
						console.log({ currentForm }))
				}
				value={currentForm}
			/> */}
		</div>
	) : (
		<h4>Loading...</h4>
	);


	const errorDiv = () => {
		return (
			<div className="text-center pt-4">
				<h3>
					Please <Link to="/login">login</Link> to view this page
				</h3>
			</div>
		);
	};

	const getUserData = async () => {
		console.log(props.user.id);
		try {
			const res = await axios.post(
				`${REACT_APP_SERVER_URL}/api/users/profile/get`,
				{ _id: props.user.id }
			);
			setUser(res.data);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		getUserData();
	}, [props.user.id]);

	return (
		<div>
			<div>{props.user ? userData : errorDiv}</div>
			<EditForm user={props.user} />
		</div>
	);
};

export default Profile;