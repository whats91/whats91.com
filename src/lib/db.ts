import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

/**
 * Ensures the SQLite database directory exists.
 * SQLite will automatically create the database file on first connection.
 */
function ensureDatabaseDirectory(): string | null {
  const databaseUrl = process.env.DATABASE_URL
  
  if (!databaseUrl) {
    console.warn('[DB] No DATABASE_URL found')
    return null
  }

  // Parse SQLite file path from DATABASE_URL
  // Format: "file:./db/custom.db" or "file:/absolute/path/to/db.db"
  if (databaseUrl.startsWith('file:')) {
    let dbPath = databaseUrl.replace('file:', '')
    
    // Handle relative paths (remove leading ./ if present)
    if (dbPath.startsWith('./')) {
      dbPath = dbPath.substring(2)
    }
    
    // If it's a relative path, resolve it from the current working directory
    if (!path.isAbsolute(dbPath)) {
      dbPath = path.resolve(process.cwd(), dbPath)
    }
    
    const dbDir = path.dirname(dbPath)
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(dbDir)) {
      console.log(`[DB] Creating database directory: ${dbDir}`)
      fs.mkdirSync(dbDir, { recursive: true })
    }
    
    return dbPath
  }
  
  return null
}

/**
 * Check if tables exist and create them if needed.
 * This matches the schema in prisma/schema.prisma
 */
async function ensureTablesExist(prisma: PrismaClient, dbPath: string | null) {
  if (!dbPath) return
  
  const dbExists = fs.existsSync(dbPath)
  
  if (dbExists) {
    console.log(`[DB] Database found at: ${dbPath}`)
    return
  }
  
  console.log(`[DB] Creating new database at: ${dbPath}`)
  
  // Create tables using raw SQL matching prisma/schema.prisma
  try {
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS User (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        name TEXT,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `)
    
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS Post (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT,
        published INTEGER NOT NULL DEFAULT 0,
        authorId TEXT NOT NULL,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `)
    
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS Contact (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        company TEXT,
        subject TEXT NOT NULL,
        message TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'new',
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `)
    
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS Demo (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'new',
        source TEXT NOT NULL DEFAULT 'popup',
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `)
    
    console.log('[DB] Tables created successfully')
  } catch (error) {
    console.error('[DB] Failed to create tables:', error)
    throw error
  }
}

// Track initialization
let isInitialized = false
let initPromise: Promise<void> | null = null
let dbPath: string | null = null

function getPrismaClient(): PrismaClient {
  // Create or reuse Prisma client
  const client = globalForPrisma.prisma ??
    new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    })
  
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = client
  }
  
  // Initialize database once
  if (!isInitialized && !initPromise) {
    // Ensure directory exists synchronously first
    dbPath = ensureDatabaseDirectory()
    
    // Then check/create tables asynchronously
    initPromise = ensureTablesExist(client, dbPath)
      .then(() => {
        isInitialized = true
      })
      .catch((error) => {
        console.error('[DB] Initialization error:', error)
        initPromise = null
      })
  }
  
  return client
}

export const db = getPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
