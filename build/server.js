"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const database_plugin_1 = require("./core/database/database.plugin");
const posts_routes_1 = require("./modules/posts/posts.routes");
const fastify = (0, fastify_1.default)({
    logger: true,
});
// Register our database plugin
fastify.register(database_plugin_1.databasePlugin);
// Register our new posts routes
fastify.register(posts_routes_1.postsRoutes);
// Declare a default route
fastify.get("/", function (request, reply) {
    reply.send({ hello: "world" });
});
const port = 3000;
fastify.listen({ port }, function (err, address) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
});
