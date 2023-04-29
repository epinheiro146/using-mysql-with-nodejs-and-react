import * as React from "react";
import { useState, useEffect } from "react";
import { BlogWTags } from "../../types";
import { useParams, Link } from "react-router-dom";
import { fetcher } from "../services/fetch-helper";
import swal from "sweetalert";

const BlogDetails = () => {
    const [blog, setBlog] = useState<BlogWTags>();
    const { id } = useParams();

    useEffect(() => {
        fetcher(`/api/blogs/${id}`)
            .then(data => setBlog(data))
            .catch(error => swal("Oops!", error.message, "error"));
    }, [id]);

    console.log(blog?.tags);

    return (
        <div className="mt-5 row justify-content-center">
            <div className="col-12 col-md-8">
                <div className="card text-bg-dark shadow-lg">
                    <div className="card-title text-center mt-4">
                        <h3>{blog?.title}</h3>
                    </div>
                    <div className="card-body">
                        <p>{blog?.content}</p>
                    </div>
                    <div className="card-footer">
                        <p>
                            {blog?.tags.map(tag => (
                                <span className="mx-2" key={`${blog.id}-${tag}`}>
                                    #{tag}
                                </span>
                            ))}
                        </p>
                        <p>{blog?._created ? `Posted ${new Date(blog._created).toLocaleString()}` : ""} by {blog?.authorname}</p>
                        <Link className="btn btn-outline-light" to={`/blogs/${id}/edit`}>
                            Edit/Delete
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;