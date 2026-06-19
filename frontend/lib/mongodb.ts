import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB ?? "crew_connect";

type MongoGlobal = typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

const mongoGlobal = globalThis as MongoGlobal;

export function hasMongoConfig() {
  return Boolean(uri);
}

export async function getMongoClient() {
  if (!uri) {
    throw new Error("MONGODB_URI is not set in .env.local");
  }

  if (!mongoGlobal._mongoClientPromise) {
    const client = new MongoClient(uri);
    mongoGlobal._mongoClientPromise = client.connect();
  }

  return mongoGlobal._mongoClientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getMongoClient();
  return client.db(dbName);
}

export const mongoCollections = {
  events: process.env.MONGODB_EVENTS_COLLECTION ?? "events",
  industries: process.env.MONGODB_INDUSTRIES_COLLECTION ?? "industries"
};
