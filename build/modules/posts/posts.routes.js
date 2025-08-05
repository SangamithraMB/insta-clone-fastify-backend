"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRoutes = void 0;
const posts_service_1 = require("./posts.service");
const postsRoutes = async (fastify) => {
    const service = (0, posts_service_1.postsService)(fastify);
    fastify.post("/posts", async (request, reply) => {
        const newPost = await service.create(request.body);
        // Return a 201 Created status code with the new post object
        return reply.code(201).send(newPost);
    });
};
exports.postsRoutes = postsRoutes;
