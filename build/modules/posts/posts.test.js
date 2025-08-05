"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const posts_routes_1 = require("./posts.routes");
describe("POST /posts", () => {
    it("should create a new post and return it with a 201 status code", async () => {
        const app = (0, fastify_1.default)();
        const newPostPayload = {
            img_url: "http://example.com/new-image.jpg",
            caption: "A brand new post from our test!",
        };
        const createdPost = { ...newPostPayload, id: 1 };
        app.decorate("transactions", {
            posts: {
                getById: jest.fn(),
                getAll: jest.fn(),
                create: jest.fn().mockReturnValue(createdPost),
            },
        });
        app.register(posts_routes_1.postsRoutes);
        const response = await app.inject({
            method: "POST",
            url: "/posts",
            payload: newPostPayload,
        });
        expect(response.statusCode).toBe(201);
        expect(JSON.parse(response.payload)).toEqual(createdPost);
    });
});
