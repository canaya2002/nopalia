import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'

// Asegurar que el directorio data existe
const dataDir = path.join(process.cwd(), 'data')
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

// Ruta de la base de datos
const dbPath = path.join(process.cwd(), 'data', 'users.db')

// Crear conexión a la base de datos
const db = new Database(dbPath)

// Configurar optimizaciones SQLite
db.pragma('journal_mode = WAL')
db.pragma('synchronous = NORMAL')
db.pragma('cache_size = 1000000')
db.pragma('foreign_keys = ON')
db.pragma('temp_store = MEMORY')

// Crear tabla de usuarios con campos para Stripe
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL COLLATE NOCASE,
    name TEXT NOT NULL,
    password TEXT NOT NULL,
    hasActiveSub INTEGER DEFAULT 0,
    stripeCustomerId TEXT UNIQUE,
    stripeSubscriptionId TEXT,
    subscriptionStatus TEXT DEFAULT 'inactive',
    subscriptionPlanId TEXT,
    subscriptionCurrentPeriodEnd INTEGER,
    trialEndsAt INTEGER,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)

// Crear tabla de sesiones para mejor control
db.exec(`
  CREATE TABLE IF NOT EXISTS user_sessions (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    token TEXT NOT NULL,
    expiresAt INTEGER NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    lastUsedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
  )
`)

// Crear índices para optimización
db.exec(`
  CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
  CREATE INDEX IF NOT EXISTS idx_users_stripe_customer ON users(stripeCustomerId);
  CREATE INDEX IF NOT EXISTS idx_users_subscription_status ON users(subscriptionStatus);
  CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON user_sessions(userId);
  CREATE INDEX IF NOT EXISTS idx_sessions_token ON user_sessions(token);
  CREATE INDEX IF NOT EXISTS idx_sessions_expires ON user_sessions(expiresAt);
`)

export default db