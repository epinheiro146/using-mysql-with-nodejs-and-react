import * as React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
    return <div className="bg-dark">
        <Link className="btn btn-primary m-2" to={"/"}>
            Home
        </Link>
        <Link className="btn btn-primary m-2" to={"/blogs"}>
            Blogs
        </Link>
        <Link className="btn btn-primary m-2" to={"/blogs/create"}>
            New Post
        </Link>
    </div>;
};

export default Navbar;