import * as express from "express";
import Blogs from "../database/queries/blogs";

const router = express.Router();

router.get('/:id/tags', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const blog = await Blogs.getById(id);
        res.json(blog[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Tried fetching the selected blog post, but something went wrong." })
    }
});

export default router;