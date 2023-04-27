import * as React from "react";
import { useState, useEffect } from "react";
import { BlogWAuthor } from "../../types";
import { Link } from "react-router-dom";
import { fetcher } from "../services/fetch-helper";
import swal from "sweetalert";

const AllBlogs = () => {
    const [blogs, setBlogs] = useState<BlogWAuthor[]>([]);

    useEffect(() => {
        fetcher(`/api/blogs`)
            .then(data => setBlogs(data))
            .catch(error => swal("Oops!", error.message, "error"));
    }, []);

    return (

        <div className="text-center mt-5">
            <h1>All Blogs</h1>
            <div className="container d-flex flex-row">
                {blogs.map(blog => (
                    <div className="col-12 col-md-4 col-lg-3 my-2" key={`blog-${blog.id}`}>
                        <Link className="text-reset text-decoration-none" to={`/blogs/${blog.id}`}>
                            <div className="card text-bg-dark shadow-lg">
                                <div className="card-title mt-4">
                                    <h3>{blog.title}</h3>
                                </div>
                                <div className="card-body">
                                    <img className="img-fluid" src="https://vignette.wikia.nocookie.net/soulcalibur/images/2/2e/Project_Soul_Logo.jpg/revision/latest?cb=20110824104830" alt="Project Soul Logo" />
                                </div>
                                <div className="card-footer">
                                    <p>{blog._created ? `${new Date(blog._created).toLocaleString()}` : ""}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default AllBlogs;