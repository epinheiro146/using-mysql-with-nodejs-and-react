import * as React from "react"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetcher } from "../services/fetch-helper";
import { Tag } from "../../types/";
import ReactSelect from "react-select";
import swal from "sweetalert";

const MAX_BLOG_LENGTH = 1800;
const MAX_TITLE_LENGTH = 60;

const Create = () => {
    const [blogTitle, setBlogTitle] = useState("");
    const [blogContent, setBlogContent] = useState("");
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

    const handleSubmitButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!blogTitle) {
            swal("Oh?", "Please enter a title! Doesn't have to be a masterpiece!", "error");
            return;
        }

        if (!blogContent) {
            swal("Feeling shy?", "Please enter some content!", "error");
            return;
        }

        if (blogTitle.length > MAX_TITLE_LENGTH) {
            swal("OK, settle down...", `Your title has to be under ${MAX_TITLE_LENGTH} characters.`, "error");
            return;
        }

        if (blogContent.length > MAX_BLOG_LENGTH) {
            swal("OK, settle down...", `Your blog has to be under ${MAX_BLOG_LENGTH} characters.`, "error");
            return;
        }

        fetcher("/api/blogs", "POST", { title: blogTitle, content: blogContent, selectedTags })
            .then((data: any) => {
                swal("Nice!", `${data.message}`, "success");
                nav(`/blogs/${data.id}`)
            })
            .catch(error => swal("Oops!", `${error.message}`, "error"));

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
                        <h4>Creating New Blog</h4>
                    </div>
                    <div className="card-body">
                        <div>
                            <p>Title:</p>
                            <textarea className="form-control mb-2" rows={1} value={blogTitle} onChange={e => setBlogTitle(e.target.value)} />
                            <p>Content:</p>
                            <textarea className="form-control mb-2" rows={5} value={blogContent} onChange={e => setBlogContent(e.target.value)} />
                            <p>Tags:</p>
                            <ReactSelect className="text-black mb-2" isMulti options={options} onChange={handleMultiSelectChange} />
                            <button onClick={handleSubmitButton} className="btn btn-outline-success">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Create;