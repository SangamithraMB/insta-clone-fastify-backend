import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import { reelsService } from "./reels.service";
import { CreateReelDto } from "./reels.types";

const reelsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  const service = reelsService(fastify);

  fastify.post<{ Body: CreateReelDto }>("/reels/grid", async (request, reply) => {
    const newReel = await service.create(request.body);

    // Return a 201 Created status code with the new post object
    return reply.code(201).send(newReel);
  });
  
  fastify.get("/reels/grid", async (request, reply) => {
    const allReels = await service.getAll();
    return reply.code(200).send(allReels);
  })
};

export { reelsRoutes };