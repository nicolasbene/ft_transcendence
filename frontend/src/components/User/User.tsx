import React, { useState, useRef } from 'react';
import Particles from '../Home/Particles.tsx';
import avatar_icon from '../assets/avatar.png';
import axios from 'axios';


const User = () => {
	const [selectedImage, setSelectedImage] = useState(avatar_icon);
	const fileInputRef = useRef(null);

	const handleImageChange = (e) => {
		if (e.target.files && e.target.files[0]) {
			let img = e.target.files[0];
			setSelectedImage(URL.createObjectURL(img));
		}
	};

	const handleImageClick = () => {
		fileInputRef.current.click();
	};

	const handleUpdateProfile = async () => {
		if (!fileInputRef.current.files[0]) return; // Check if a file is selected
	  
		const formData = new FormData();
		formData.append('file', fileInputRef.current.files[0]);
		const token = localStorage.getItem('jwtToken');
		console.log('JWT Token:', token);

		
		try {
		  const response = await axios.post('http://localhost:8080/users/upload-profile-picture', formData, {
			headers: {
			  'Content-Type': 'multipart/form-data',
			  'Authorization': `Bearer ${token}`,
			  // Include any additional headers like authorization tokens if needed
			},
		  });
		  console.log('New profile pic successfully uploaded !', response.data);
		} catch (error) {
			console.error('Error uploading a new profile pic:', error); }
		};

	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="flex flex-col bg-white w-[600px] mx-auto mt-[200px] pb-[30px] rounded-lg">
				<Particles className="absolute inset-0 -z-10" quantity={1000} />
				
				{/* Header */}
				<h1 className="text-black text-2xl font-bold mx-auto mt-8">USER INFORMATION</h1>

				{/* Avatar and Upload */}
				<div className="flex items-center mx-auto ml-5 mt-8">
					<img src={selectedImage} alt="User Avatar" className="w-20 h-20 object-cover mx-auto ml-12 rounded-full cursor-pointer" onClick={handleImageClick} />
					<input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" />
					<p className="text-lg font-bold ml-8">John Doe</p>
				</div>

				{/* All the stats go here */}
				<div className="bg-gray-200 p-4 rounded-lg mx-auto mt-8	w-3/4">
					<p className="text-lg font-bold">RANK : </p>
					<p className="text-lg">WINS & LOSSES </p>
				</div>

				{/* Amend button */}
				<button className="bg-gray-500 text-white py-2 px-4 rounded-full text-lg font-bold my-4 mx-auto"
					style={{ width: '220px', height: '59px' }}
					onClick={handleUpdateProfile}
					>Update Profile</button>
			</div>
		</div>
	);
}

export default User;