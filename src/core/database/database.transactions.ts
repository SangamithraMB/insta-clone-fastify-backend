import type { Database } from "better-sqlite3";
import { CreatePostDto } from "src/modules/posts/posts.types";

// This factory function creates and returns our transaction helpers.
export const createTransactionHelpers = (db: Database) => {
    // We use prepared statements for security and performance.
    const statements = {
        getPostById: db.prepare("SELECT * FROM posts WHERE id = ?"),
        getAllPosts: db.prepare("SELECT * FROM posts"),
        createPost: db.prepare("INSERT INTO posts (img_url, caption) VALUES (@img_url, @caption) RETURNING *"),
        getReelById: db.prepare("SELECT * FROM reels WHERE id = ?"),
        getAllReels: db.prepare("SELECT * FROM reels"),
        createReel: db.prepare("INSERT INTO reels (video_url, thumbnail_url, caption, views) VALUES (@video_url, @thumbnail_url, @caption, @views) RETURNING *"),
        getHighlightById: db.prepare("SELECT * FROM highlights WHERE id = ?"),
        getAllHighlights: db.prepare("SELECT * FROM highlights"),
        createHighlight: db.prepare("INSERT INTO highlights (cover_image_url, title) VALUES (@cover_image_url, @title) RETURNING *"),
        getTagById: db.prepare(`
            SELECT tagged.id, tagged.post_id, tagged.tagged_by_user, tagged.created_at,
                   posts.img_url, posts.caption
            FROM tagged
            JOIN posts ON tagged.post_id = posts.id
            WHERE tagged.id = ?
          `),
          getAllTags: db.prepare(`
            SELECT tagged.id, tagged.post_id, tagged.tagged_by_user, tagged.created_at,
                   posts.img_url, posts.caption
            FROM tagged
            JOIN posts ON tagged.post_id = posts.id
          `),
          createTag: db.prepare(`
            INSERT INTO tagged (post_id, tagged_by_user) VALUES (@post_id, @tagged_by_user) RETURNING *
          `),
    };
    const posts = {
        getById: (id: number) => {
            return statements.getPostById.get(id);
        },
        getAll: () => {
            return statements.getAllPosts.all();
        },
        create: (data: unknown[]) => {
            return statements.createPost.get(data);
        },
    };
    const reels = {
        getById: (id: number) => {
            return statements.getReelById.get(id);
        },
        getAll: () => {
            return statements.getAllReels.all();
        },
        create: (data: unknown[]) => {
            return statements.createReel.get(data);
        }
    };
    const highlights = {
        getById: (id: number) => {
            return statements.getHighlightById.get(id);
        },
        getAll: () => {
            return statements.getAllHighlights.all();
        },
        create: (data: unknown[]) => {
            return statements.createHighlight.get(data);
        }
    }
    const tagged = {
        getById: (id: number) => {
            return statements.getTagById.get(id);
        },
        getAll: () => {
            return statements.getAllTags.all();
        },
        create: (data: unknown[]) => {
            return statements.createTag.get(data);
        }
    }
    return {
        posts,
        reels,
        highlights,
        tagged,
    };
};
exports.createTransactionHelpers = createTransactionHelpers;
