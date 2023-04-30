import * as React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Blog, Tag } from "../../types";
import { fetcher } from "../services/fetch-helper";
import ReactSelect from "react-select";
import swal from "sweetalert";

const MAX_BLOG_LENGTH = 1800;
const MAX_TITLE_LENGTH = 60;

const Edit = () => {
    const { id } = useParams();
    const [blogDetails, setBlogDetails] = useState<Blog>();

    const [updatedTitle, setUpdatedTitle] = useState("");
    const [updatedContent, setUpdatedContent] = useState("");
    const [tags, setTags] = useState<Tag[]>([]);
    const [selectedTags, setSelectedTags] = useState<number[]>([]);
    const nav = useNavigate();

    useEffect(() => {
        fetcher('/api/tags')
            .then(data => setTags(data))
            .catch(error => swal("Oops!", error.message, "error"));
    }, []);

    const options = tags.map(t => (
        { value: `${t.id}`, label: `#${t.name}` }
    ));

    useEffect(() => {
        fetcher(`/api/blogs/${id}`)
            .then(data => {
                setBlogDetails(data);
                setUpdatedTitle(data.title);
                setUpdatedContent(data.content);
            })
            .catch(error => swal("Oops!", `${error.message}`, "error"));
    }, [id]);

    const handleSaveChanges = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!updatedTitle) {
            swal("Oh?", "Please enter a title! Doesn't have to be a masterpiece!", "error");
            return;
        }

        if (!updatedContent) {
            swal("Feeling shy?", "Please enter some content!", "error");
            return;
        }

        if (updatedTitle.length > MAX_TITLE_LENGTH) {
            swal("OK, settle down...", `Your title has to be under ${MAX_TITLE_LENGTH} characters.`, "error");
            return;
        }

        if (updatedContent.length > MAX_BLOG_LENGTH) {
            swal("OK, settle down...", `Your blog has to be under ${MAX_BLOG_LENGTH} characters.`, "error");
            return;
        }

        fetcher(`/api/blogs/${id}`, "PUT", { title: updatedTitle, content: updatedContent, selectedTags })
            .then(data => {
                swal("Looking good!", `${data.message}`, "success");
                nav(`/blogs/${id}`);
            })
            .catch(error => swal("Oops!", `${error.message}`, "error"));
    };

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        fetcher(`/api/blogs/${id}`, "DELETE")
            .then(data => {
                swal("And... gone!", data.message, "success");
                nav(`/blogs`);
            })
            .catch(error => swal("Oops!", error.message, "error"));
    };

    const handleMultiSelectChange = e => {
        console.log(e);
        setSelectedTags(e);
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
                                <p>Tags:</p>
                                <ReactSelect className="text-black mb-2" isMulti options={options} onChange={handleMultiSelectChange} />
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