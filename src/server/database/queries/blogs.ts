import { Query } from "..";
import { BlogWAuthor, BlogWTags } from "../../../types";

const getAll = () => Query<BlogWAuthor[]>(
    `SELECT
        b.*,
        a.name as authorname
    FROM blogs b
    JOIN authors a ON b.authorid = a.id
    ORDER BY b.id`
);

const getById = (id: number) => Query<BlogWTags[]>(
    `SELECT
	    b.*,
        a.name as authorname,
        group_concat(t.name) as tagStr
    FROM blogs b
    JOIN authors a on b.authorid = a.id
    LEFT JOIN blogtags bt on bt.blogid = b.id
    LEFT JOIN tags t on t.id = bt.tagid
    WHERE b.id = ?
    GROUP BY b.id`, [id]
);

const create = (title: BlogWAuthor['title'], content: BlogWAuthor['content'], authorid: BlogWAuthor['authorid']) => Query(
    `INSERT INTO blogs (title, content, authorid)
    VALUES (?, ?, ?)`,
    [title, content, authorid]
);

const update = (id: BlogWAuthor['id'], title: BlogWAuthor['title'], content: BlogWAuthor['content']) => Query(
    `UPDATE blogs
    SET title = ?,
    content = ?
    WHERE id = ?`,
    [title, content, id]
);

const destroy = (id: BlogWAuthor['id']) => Query(
    `DELETE FROM blogs
    WHERE id = ?`,
    [id]
);

export default {
    getAll,
    getById,
    create,
    update,
    destroy
};