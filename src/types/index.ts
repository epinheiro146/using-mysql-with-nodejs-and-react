export interface Blog {
    id?: number;
    title: string;
    content: string;
    authorid?: Author['id']; // fk referencing authors.id
    _created?: Date | string;
};

export interface Author {
    id?: number;
    name: string;
    _created?: Date | string;
};

export interface Tag {
    id: number;
    name: string;
    _created?: Date | string;
};

export interface BlogWAuthor extends Blog {
    authorname: Author['name'];
};

export interface BlogWTags extends BlogWAuthor {
    tagStr?: string;
    tags: string[];
};

export interface BlogTags {
    blogid: Blog['id'];
    tagid: Tag['id'];
};