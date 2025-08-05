import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import { taggedService } from "./tagged.service";
import { CreateTagDto } from "./tagged.types";

const taggedRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  const service = taggedService(fastify);

  fastify.post<{ Body: CreateTagDto }>("/tagged/grid", async (request, reply) => {
    const newTag = await service.create(request.body);

    // Return a 201 Created status code with the new post object
    return reply.code(201).send(newTag);
  });
  
  fastify.get("/tagged/grid", async (request, reply) => {
    const allTags = await service.getAll();
    return reply.code(200).send(allTags);
  })
};

export { taggedRoutes };