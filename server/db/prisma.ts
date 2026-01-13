/**
 * Server Database Module
 * Re-exports from the centralized app/lib/db module
 * This ensures a single Prisma instance across the entire application
 */

export { prisma, disconnectDB, checkDBConnection } from "../../app/lib/db";
