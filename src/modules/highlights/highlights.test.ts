import Fastify from "fastify";
import { highlightsRoutes } from "./highlights.routes";

describe("GET /highlights", () => {
  
  it("should return a list of highlights with a 200 status code", async () => {
    const app = Fastify();
    const mockHighlights = [
      {
        id: 1,
        cover_image_url: "http://example.com/thumb1.png",
        title: "Highlight 1",
      },
      {
        id: 2,
        cover_image_url: "http://example.com/thumb2.png",
        title: "Highlight 2",
      },
    ];

    app.decorate("transactions", {
      posts: {
        create: jest.fn(),
        getAll: jest.fn(),
        getById: jest.fn(),
      },
      reels:{
        create: jest.fn(),
        getAll: jest.fn(),
        getById: jest.fn(),
      },
      tagged:{
        create: jest.fn(),
        getAll: jest.fn(),
        getById: jest.fn(),
      },
      highlights: {
        create: jest.fn(),
        getAll: jest.fn().mockReturnValue(mockHighlights),
        getById: jest.fn(),
      },
    });

    app.register(highlightsRoutes);

    const response = await app.inject({
      method: "GET",
      url: "/highlights",
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.payload)).toEqual(mockHighlights);
  });

  it("GET /highlights/:id - should return a highlight for the given id with a 200 status code", async () => {
    const app = Fastify();
    const mockHighlight = {
      id: 1,
      cover_image_url: "http://example.com/thumb1.png",
      title: "Highlight 1",
    };

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
        getAll: jest.fn(),
        getById: jest.fn(),
      },
      highlights: {
        create: jest.fn(),
        getAll: jest.fn(),
        getById: jest.fn().mockReturnValue(mockHighlight),
      },
    });

    app.register(highlightsRoutes);

    const response = await app.inject({
      method: "GET",
      url: "/highlights/1",
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.payload)).toEqual(mockHighlight);
  });
});