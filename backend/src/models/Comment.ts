import { Schema, model, Document, Types } from 'mongoose';

export interface IComment extends Document {
    postId: Types.ObjectId;
    authorId: string;       // appwriteUserId
    authorName: string;
    body: string;
    upvotes: string[];
    upvoteCount: number;
    createdAt: Date;
    updatedAt: Date;
}

const CommentSchema = new Schema<IComment>({
    postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    authorId: { type: String, required: true },
    authorName: { type: String, required: true },
    body: { type: String, required: true, trim: true },
    upvotes: [{ type: String }],
    upvoteCount: { type: Number, default: 0 },
}, { timestamps: true });

CommentSchema.index({ postId: 1, createdAt: 1 });

export const Comment = model<IComment>('Comment', CommentSchema);
