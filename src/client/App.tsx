import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './views/Home';
import AllBlogs from './views/Blogs';
import Create from './views/Create';
import BlogDetails from './views/BlogDetails';
import Edit from './views/Edit';

const App = () => {
	return (
		<BrowserRouter>
			<Navbar />
			<div className="container mt-5 text-bg-primary">
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/blogs' element={<AllBlogs />} />
					<Route path='/blogs/create' element={<Create />} />
					<Route path='/blogs/:id' element={<BlogDetails />} />
					<Route path='/blogs/:id/edit' element={<Edit />} />
				</Routes>
			</div>
		</BrowserRouter>
	)
}

export default App;