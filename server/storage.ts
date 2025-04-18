import { 
  users, type User, type InsertUser,
  documents, type Document, type InsertDocument,
  summaries, type Summary, type InsertSummary
} from "@shared/schema";

// Storage interface with all CRUD methods needed for the application
export interface IStorage {
  // User methods (from original template)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Document methods
  createDocument(document: InsertDocument): Promise<Document>;
  getDocument(id: number): Promise<Document | undefined>;
  
  // Summary methods
  createSummary(summary: InsertSummary): Promise<Summary>;
  getSummary(id: number): Promise<Summary | undefined>;
  getSummariesByDocumentId(documentId: number): Promise<Summary[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private documents: Map<number, Document>;
  private summaries: Map<number, Summary>;
  private currentUserId: number;
  private currentDocumentId: number;
  private currentSummaryId: number;

  constructor() {
    this.users = new Map();
    this.documents = new Map();
    this.summaries = new Map();
    this.currentUserId = 1;
    this.currentDocumentId = 1;
    this.currentSummaryId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Document methods
  async createDocument(insertDocument: InsertDocument): Promise<Document> {
    const id = this.currentDocumentId++;
    const document: Document = { ...insertDocument, id };
    this.documents.set(id, document);
    return document;
  }

  async getDocument(id: number): Promise<Document | undefined> {
    return this.documents.get(id);
  }

  // Summary methods
  async createSummary(insertSummary: InsertSummary): Promise<Summary> {
    const id = this.currentSummaryId++;
    const summary: Summary = { ...insertSummary, id };
    this.summaries.set(id, summary);
    return summary;
  }

  async getSummary(id: number): Promise<Summary | undefined> {
    return this.summaries.get(id);
  }

  async getSummariesByDocumentId(documentId: number): Promise<Summary[]> {
    return Array.from(this.summaries.values()).filter(
      (summary) => summary.documentId === documentId
    );
  }
}

export const storage = new MemStorage();
