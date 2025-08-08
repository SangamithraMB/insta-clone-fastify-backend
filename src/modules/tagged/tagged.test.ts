import Fastify from "fastify";
import { taggedRoutes } from "./tagged.routes";

describe("GET /tagged/grid", () => {
    
  it("should return a list of reels with a 200 status code", async () => {
    const app = Fastify();
    const mockTags = [
      {
        "id": 1,
        "img_url": "http://example.com/thumb1.png",
        "caption": "caption 1",
        "tagged_by_user": "username1"
      },
      {
        id: 2,
        "img_url": "http://example.com/thumb2.png",
        "caption": " caption 2",
        "tagged_by_user": "username2"
      },
    ];

    // To satisfy TypeScript, our mock must match the full shape of the
    // 'transactions' dependency, including all methods on 'posts'.
    app.decorate("transactions", {
      posts: {
        create: jest.fn(),
        getAll: jest.fn(),
        getById: jest.fn(),
      },
      reels: {
        create: jest.fn(),
        getAll: jest.fn(),
        getById: jest.fn(),
      },
      tagged: {
        create: jest.fn(),
        getAll: jest.fn().mockReturnValue(mockTags),
        getById: jest.fn(),
      },
      highlights: {
        create: jest.fn(),
        getAll: jest.fn(),
        getById: jest.fn(),
      },
    });

    app.register(taggedRoutes);

    const response = await app.inject({
      method: "GET",
      url: "/tagged/grid",
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.payload)).toEqual(mockTags);
  });
});