/**
 * Database exports
 * Clean API for importing database client
 *
 * Usage:
 * import { db } from "@/server/db"
 * import { db, checkDBConnection } from "@/server/db"
 */

export { 
  prisma as db, 
  disconnectDB, 
  checkDBConnection 
} from "./prisma";
