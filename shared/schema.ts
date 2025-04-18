import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Document schema for storing processed PDFs
export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  filename: text("filename").notNull(),
  content: text("content").notNull(),
  language: text("language").notNull().default("english"),
  createdAt: text("created_at").notNull(),
});

export const insertDocumentSchema = createInsertSchema(documents).pick({
  filename: true,
  content: true,
  language: true,
  createdAt: true,
});

// Summary schema for storing generated summaries
export const summaries = pgTable("summaries", {
  id: serial("id").primaryKey(),
  documentId: integer("document_id").notNull(),
  summary: text("summary").notNull(),
  question: text("question"),
  language: text("language").notNull().default("english"),
});

export const insertSummarySchema = createInsertSchema(summaries).pick({
  documentId: true,
  summary: true,
  question: true,
  language: true,
});

// Types
export type InsertDocument = z.infer<typeof insertDocumentSchema>;
export type Document = typeof documents.$inferSelect;

export type InsertSummary = z.infer<typeof insertSummarySchema>;
export type Summary = typeof summaries.$inferSelect;

// Keep existing user schema for authentication if needed later
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// API schema validations
export const summarizeRequestSchema = z.object({
  content: z.string(),
  question: z.string().optional(),
  language: z.enum(["english", "hungarian"]).default("english"),
  filename: z.string().optional(),
});

export type SummarizeRequest = z.infer<typeof summarizeRequestSchema>;

export const summarizeResponseSchema = z.object({
  summary: z.string(),
  question: z.string().optional(),
});

export type SummarizeResponse = z.infer<typeof summarizeResponseSchema>;
