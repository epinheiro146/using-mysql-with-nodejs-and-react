import * as express from 'express';
import Blogs from '../database/queries/blogs';
import Blogtags from '../database/queries/blogtags';
import { BlogWAuthor, BlogTags } from '../../types';

const router = express.Router();

// GET /api/blogs
router.get('/', async (req, res) => {
    try {
        const blogs = await Blogs.getAll();
        res.json(blogs);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Tried fetching every blog post, but something went wrong." })
    }
});

// GET /api/blogs/?
router.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const blog = await Blogs.getById(id);

        if (blog[0]) {
            res.json({ ...blog[0], tags: blog[0].tagStr?.split(",") || [] });
        } else {
            res.status(404).json({ message: "Blog doesn't exist or was deleted!" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Tried fetching the selected blog post, but something went wrong." })
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, content, selectedTags } = req.body as { title: BlogWAuthor['title'], content: BlogWAuthor['content'], selectedTags: { value: number, label: string }[] }; // same as: const title = req.body.title; const content = req.body.content;
        const authorid = 1;


        if (!title || typeof title !== "string" || title.length > 60) {
            return res.status(400).json({ message: "Sorry, the title must be between 1 and 60 characters." });
        };

        if (!content || typeof content !== "string" || content.length > 1800) {
            return res.status(400).json({ message: "Sorry, your post must be between 1 and 1800 characters." });
        };

        const results = await Blogs.create(title, content, authorid);

        const blogid = results.insertId;

        for await (const selectedTag of selectedTags) {
            const tagid = selectedTag.value;

            await Blogtags.create(blogid, tagid);
        };

        res.status(201).json({ message: "Posted new blog entry!", id: results.insertId });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Tried making a new blog post, but something went wrong." })
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { title, content, selectedTags } = req.body as { title: BlogWAuthor['title'], content: BlogWAuthor['content'], selectedTags: { value: number, label: string }[] };

        if (!title || typeof title !== "string" || title.length > 60) {
            return res.status(400).json({ message: "Sorry, the title must be between 1 and 60 characters." });
        };

        if (!content || typeof content !== "string" || content.length > 1800) {
            return res.status(400).json({ message: "Sorry, your post must be between 1 and 1800 characters." });
        };

        await Blogtags.deleteByBlogId(id);
        await Blogs.update(id, title, content);

        for await (const selectedTag of selectedTags) {
            const tagid = selectedTag.value;

            await Blogtags.create(id, tagid);
        };

        res.status(201).json({ message: "Post has been updated." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Tried updating blog post, but something went wrong." })
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await Blogtags.deleteByBlogId(id);
        const metaDataResults = await Blogs.destroy(id);
        if (metaDataResults.affectedRows) {
            res.json({ message: "Post successfully deleted." });
        } else {
            res.status(404).json({ message: "Post either doesn't exist or has already been deleted." })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Tried deleting blog post, but something went wrong." })
    }
});

export default router;