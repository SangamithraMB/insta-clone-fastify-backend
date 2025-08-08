import Fastify from "fastify";
import path from "path";
import multipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";
import { databasePlugin } from "./core/database/database.plugin";
import { postsRoutes } from "./modules/posts/posts.routes";
import { reelsRoutes } from "./modules/reels/reels.routes";
import { taggedRoutes } from "./modules/tagged/tagged.routes";
import { highlightsRoutes } from "./modules/highlights/highlights.routes";
// import { usersRoutes } from "./modules/users/users.routes";

const fastify = Fastify({
  logger: true,
});

// Register multipart plugin
fastify.register(multipart, {
  limits: {
    fileSize: 10 * 1024 * 1024 // 10 MB
  }
});

// Serve the public/uploads directory under /uploads URL path
fastify.register(fastifyStatic, {
  root: path.join(process.cwd(), "public", "uploads"),
  prefix: "/uploads/",
  index: false,
});

// Register our database plugin
fastify.register(databasePlugin);
// Register our new posts routes
fastify.register(postsRoutes);
fastify.register(reelsRoutes);
fastify.register(taggedRoutes);
fastify.register(highlightsRoutes);
// fastify.register(usersRoutes)

// Declare a default route
fastify.get("/", function (request, reply) {
  reply.send({ hello: "world" });
});

const port = Number(process.env.PORT) || 3000;

fastify.listen({ port, host: "0.0.0.0" }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server listening at ${address}`);
});