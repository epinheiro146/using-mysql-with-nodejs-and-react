import * as React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Blog } from "../../types";
import { fetcher } from "../services/fetch-helper";
import swal from "sweetalert";

const Edit = () => {
    const { id } = useParams();
    const nav = useNavigate();
    const [blogDetails, setBlogDetails] = useState<Blog>();
    const [updatedTitle, setUpdatedTitle] = useState("");
    const [updatedContent, setUpdatedContent] = useState("");

    useEffect(() => {
        fetcher(`/api/blogs/${id}`)
            .then(data => {
                setBlogDetails(data);
                setUpdatedTitle(data.title);
                setUpdatedContent(data.content);
            })
            .catch(error => swal("Oops!", `${error.message}`, "error"));
    }, [id]);

    const handleSaveChanges = () => {

        fetcher(`/api/blogs/${id}`, "PUT", { title: updatedTitle, content: updatedContent })
            .then(data => {
                swal("Looking good!", `${data.message}`, "success");
                nav(`/blogs/${id}`);
            })
            .catch(error => swal("Oops!", `${error.message}`, "error"));
    };

    const handleDelete = () => {

        fetcher(`/api/blogs/${id}`, "DELETE")
            .then(data => {
                swal("And... gone!", data.message, "success");
                nav(`/blogs`);
            })
            .catch(error => swal("Oops!", error.message, "error"));
    };

    return (
        <div className="mt-5 row justify-content-center">
            <div className="col-12 col-md-8">
                <div className="card text-bg-dark shadow-lg">
                    <div className="card-title text-center mt-4">
                        <h3>Editing Blog #{id}, originally posted {blogDetails?._created ? `${new Date(blogDetails._created).toLocaleString()}` : ""}</h3>
                    </div>
                    <div className="card-body">
                        {blogDetails && ( // controlled React input: makes sure that your state exists, then runs the following if it does
                            <div>
                                <p>Title:</p>
                                <textarea className="form-control mb-2" rows={1} value={updatedTitle} onChange={e => setUpdatedTitle(e.target.value)} />
                                <p>Content:</p>
                                <textarea className="form-control mb-2" rows={5} value={updatedContent} onChange={e => setUpdatedContent(e.target.value)} />
                                <button onClick={handleSaveChanges} className="btn btn-outline-success">Save Changes</button>
                                <button onClick={handleDelete} className="btn btn-outline-danger mx-2">Delete</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Edit;