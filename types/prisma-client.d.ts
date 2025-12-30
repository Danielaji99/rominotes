/**
 * Minimal local type declaration for `@prisma/client`.
 *
 * This file provides a lightweight declaration for the Prisma client so the
 * TypeScript server / editor can resolve `PrismaClient` in environments where
 * the generated client types are not yet picked up. It's intended as a
 * temporary fallback — you should run `npx prisma generate` and rely on the
 * real generated types for full type-safety.
 *
 * Keep this file small and conservative to avoid conflicting with the real
 * `@prisma/client` types when they are present.
 */

declare module "@prisma/client" {
  /**
   * Minimal PrismaClient shape used in this project.
   * The real generated Prisma client exposes many more methods and typed model delegates.
   */
  export class PrismaClient {
    constructor(options?: { log?: Array<string> } | unknown);
    $connect(): Promise<void>;
    $disconnect(): Promise<void>;
    // Delegate lookup typing (real client has typed delegates such as prisma.user)
    [key: string]: unknown;
  }

  // Convenience exports that some code may reference.
  export const Prisma: unknown;
  export type PrismaClientKnownRequestError = unknown;

  export default PrismaClient;
}
