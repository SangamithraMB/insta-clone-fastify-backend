import { z } from "zod";

// First, we define the zod schemas
const createHightlightDtoSchema = z.object({
  cover_image_url: z.string().url(),
  title: z.string(),
});

const highlightSchema = z.object({
  id: z.number(),
  cover_image_url: z.string().url(),
  title: z.string(),
});

// This will be useful for validating the response from the `GET /reels/grid` endpoint.
const highlightsSchema = z.array(highlightSchema);

// Then, we infer the TypeScript types directly from our Zod schemas.
// This avoids duplicating type definitions and ensures our types always match our validation rules.
type CreateHighlightDto = z.infer<typeof createHightlightDtoSchema>;
type Highlight = z.infer<typeof highlightSchema>;

export { createHightlightDtoSchema, highlightSchema, highlightsSchema, CreateHighlightDto, Highlight };