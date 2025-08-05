"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsService = void 0;
const postsService = (fastify) => {
    return {
        create: async (postData) => {
            fastify.log.info(`Creating a new post`);
            // This will use the MOCK `transactions` in our test,
            // and the REAL `transactions` in our live application.
            const post = fastify.transactions.posts.create(postData);
            return post;
        },
    };
};
exports.postsService = postsService;
