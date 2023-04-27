import { Query } from "..";
import { Tag } from "../../../types";

const getAll = () => Query<Tag[]>(`SELECT * FROM tags`);

export default {
    getAll
};