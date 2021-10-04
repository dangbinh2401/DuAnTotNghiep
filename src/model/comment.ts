import { Custommer } from "./custommer";

export class Comment {
    commentId!: string;
    content!: string;
    productId!: number;
    custommer!: Custommer;
    dateCreated!: Date;
    lastUpdated!: Date;
    deleteFlag!: number;
}