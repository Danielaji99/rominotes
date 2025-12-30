/**
 * Minimal type declarations for `bcrypt`.
 *
 * These typings are intentionally small and only cover the async/sync helpers
 * used by this project (hash/compare/genSalt). If you install
 * `@types/bcrypt` as a dev dependency, those types will take precedence and
 * provide a more complete experience.
 *
 * Usage patterns supported:
 *  - import * as bcrypt from "bcrypt";
 *  - import bcrypt from "bcrypt";       (with `esModuleInterop` / `allowSyntheticDefaultImports`)
 */

declare module "bcrypt" {
  /**
   * Generate a salt asynchronously.
   * @param rounds number of rounds (default typically 10)
   */
  export function genSalt(rounds?: number): Promise<string>;

  /**
   * Generate a salt synchronously.
   */
  export function genSaltSync(rounds?: number): string;

  /**
   * Hash a string asynchronously using a salt or number of rounds.
   */
  export function hash(
    data: string,
    saltOrRounds: string | number,
  ): Promise<string>;

  /**
   * Hash a string synchronously using a salt or number of rounds.
   */
  export function hashSync(data: string, saltOrRounds: string | number): string;

  /**
   * Compare a plain string to a hash asynchronously.
   */
  export function compare(data: string, encrypted: string): Promise<boolean>;

  /**
   * Compare a plain string to a hash synchronously.
   */
  export function compareSync(data: string, encrypted: string): boolean;

  // Default export object shape to support `import bcrypt from "bcrypt";`
  const _default: {
    genSalt: typeof genSalt;
    genSaltSync: typeof genSaltSync;
    hash: typeof hash;
    hashSync: typeof hashSync;
    compare: typeof compare;
    compareSync: typeof compareSync;
  };

  export default _default;
}
