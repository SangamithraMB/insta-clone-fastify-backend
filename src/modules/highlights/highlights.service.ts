import type { FastifyInstance } from "fastify";
import { CreateHighlightDto } from "./highlights.types";

const highlightsService = (fastify: FastifyInstance) => {
  return {
    create: async (highlightData: CreateHighlightDto) => {
      fastify.log.info(`Creating a new highlight`);
      // This will use the MOCK `transactions` in our test,
      // and the REAL `transactions` in our live application.
      const highlight = fastify.transactions.highlights.create(highlightData);
      return highlight;
    },
    getAll: async () => {
      fastify.log.info('fetching all highlights');
      const highlights = fastify.transactions.highlights.getAll();
      return highlights;
    }
  };
};

export { highlightsService };