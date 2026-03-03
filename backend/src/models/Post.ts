import { Schema, model, Document, Types } from 'mongoose';

export interface IPost extends Document {
    circleId: Types.ObjectId;
    circleSlug: string;
    authorId: string;           // appwriteUserId
    authorName: string;
    title: string;
    body: string;
    upvotes: string[];          // appwriteUserIds who upvoted
    upvoteCount: number;
    commentCount: number;
    isPinned: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const PostSchema = new Schema<IPost>({
    circleId: { type: Schema.Types.ObjectId, ref: 'Circle', required: true },
    circleSlug: { type: String, required: true },
    authorId: { type: String, required: true },
    authorName: { type: String, required: true },
    title: { type: String, required: true, trim: true, maxlength: 300 },
    body: { type: String, default: '' },
    upvotes: [{ type: String }],
    upvoteCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
    isPinned: { type: Boolean, default: false },
}, { timestamps: true });

PostSchema.index({ circleSlug: 1, createdAt: -1 });
PostSchema.index({ circleId: 1 });
PostSchema.index({ upvoteCount: -1 });

export const Post = model<IPost>('Post', PostSchema);
