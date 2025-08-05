import { z } from "zod";

// First, we define the zod schemas
const createReelDtoSchema = z.object({
  video_url: z.string().url(),
  thumbnail_url: z.string().url(),
  caption: z.string().optional(), 
  views: z.number().int().min(0),
  created_at: z.string(),
});

const reelSchema = z.object({
  id: z.number(),
  video_url: z.string().url(),
  thumbnail_url: z.string().url(),
  caption: z.string().optional(), 
  views: z.number().int().min(0),
  created_at: z.string(),
});

// This will be useful for validating the response from the `GET /reels/grid` endpoint.
const reelsSchema = z.array(reelSchema);

// Then, we infer the TypeScript types directly from our Zod schemas.
// This avoids duplicating type definitions and ensures our types always match our validation rules.
type CreateReelDto = z.infer<typeof createReelDtoSchema>;
type Reel = z.infer<typeof reelSchema>;

export { createReelDtoSchema, reelSchema, reelsSchema, CreateReelDto, Reel };