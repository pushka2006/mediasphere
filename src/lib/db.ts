/**
 * ============================================================================
 * MEDIASPHERE AI — DATABASE CLIENT & RUNTIME ASSERTION
 * Copyright (C) 2026 Pushkar (pushka2006). All Rights Reserved.
 * ============================================================================
 */

import { PrismaClient } from "@prisma/client";
import { assertAuthorizedRuntime } from "./licenseGuard";

// Validate license state upon DB client initialization
assertAuthorizedRuntime();

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

export default db;

