import * as express from "express";
import blogsRouter from "./blogs";
import tagsRouter from "./tags";
import blogTagsRouter from "./blogtags";

const router = express.Router();

router.use("/api/blogs", blogsRouter);
router.use("/api/tags", tagsRouter);
router.use("/api/blogtags", blogTagsRouter);

export default router;