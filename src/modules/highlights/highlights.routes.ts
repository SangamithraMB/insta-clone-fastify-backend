import type { FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import { highlightsService } from "./highlights.service";
import { CreateHighlightDto } from "./highlights.types";

const highlightsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  const service = highlightsService(fastify);

  fastify.post<{ Body: CreateHighlightDto }>("/highlights", async (request, reply) => {
    const newHighlight = await service.create(request.body);

    // Return a 201 Created status code with the new post object
    return reply.code(201).send(newHighlight);
  });
  
  fastify.get("/highlights", async (request, reply) => {
    const allHighlights = await service.getAll();
    return reply.code(200).send(allHighlights);
  });
  fastify.get('/highlights/:id', async (
    request: FastifyRequest<{ Params: { id: string } }>, 
    reply: FastifyReply
  ) => {
    const { id } = request.params;  // Now TypeScript knows `id` exists here
    const highlightId = Number(id);
  
    const highlightById = await fastify.transactions.highlights.getById(highlightId);
    if (!highlightById) {
      return reply.status(404).send({ message: 'Highlight not found' });
    }
    return highlightById;
  });
};

export { highlightsRoutes };