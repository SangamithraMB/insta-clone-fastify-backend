import { z } from "zod";

// First, we define the zod schemas
const createTagDtoSchema = z.object({
  post_id: z.number(), 
  img_url: z.string().url(), 
  caption: z.string().optional(), 
  tagged_by_user: z.string(),
  created_at: z.string(),
});

const tagSchema = z.object({
  id: z.number(),
  post_id: z.number(), 
  img_url: z.string().url(), 
  caption: z.string().optional(), 
  tagged_by_user: z.string(),
  created_at: z.string(),
});

// This will be useful for validating the response from the `GET /reels/grid` endpoint.
const tagsSchema = z.array(tagSchema);

// Then, we infer the TypeScript types directly from our Zod schemas.
// This avoids duplicating type definitions and ensures our types always match our validation rules.
type CreateTagDto = z.infer<typeof createTagDtoSchema>;
type Tag = z.infer<typeof tagSchema>;

export { createTagDtoSchema, tagSchema, tagsSchema, CreateTagDto, Tag };