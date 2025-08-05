import type { FastifyInstance } from "fastify";
import { CreateTagDto } from "./tagged.types";

const taggedService = (fastify: FastifyInstance) => {
  return {
    create: async (tagData: CreateTagDto) => {
      fastify.log.info(`Creating a new Tag`);
      // This will use the MOCK `transactions` in our test,
      // and the REAL `transactions` in our live application.
      const tag = fastify.transactions.tagged.create(tagData);
      return tag;
    },
    getAll: async () => {
      fastify.log.info('fetching all tags');
      const tags = fastify.transactions.tagged.getAll();
      return tags;
    }
  };
};

export { taggedService };