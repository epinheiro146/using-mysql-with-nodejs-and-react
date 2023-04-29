import { Query } from "..";
import { BlogTags, Blog, Tag } from "../../../types";

const getByBlogId = (blogid: Blog['id']) => Query<BlogTags[]>(
    `CALL spBlogTags(?)`,
    [blogid]
);

const create = (blogid: number, tagid: Tag['id']) => Query(
    `INSERT INTO blogtags (blogid, tagid)
    VALUES (?, ?)`,
    [blogid, tagid]
);

const deleteByBlogId = (blogid: Blog['id']) => Query(
    `DELETE FROM blogtags
    WHERE blogid = ?`,
    [blogid]
);

export default {
    getByBlogId,
    create,
    deleteByBlogId
};