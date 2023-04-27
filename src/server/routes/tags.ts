import * as express from 'express';
import Tags from '../database/queries/tags';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const tags = await Tags.getAll();
        res.json(tags);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong." })
    }
});

export default router;