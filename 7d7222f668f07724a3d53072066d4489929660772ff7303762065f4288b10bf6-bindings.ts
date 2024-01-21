export namespace LocalJsComponentBindgenTypes {
  export function generate(component: Uint8Array, options: GenerateOptions): Transpiled;
  export function generateTypes(name: string, options: TypeGenerationOptions): Files;
}
export type Files = [string, Uint8Array][];
export type Maps = [string, string][];
export type InstantiationMode = InstantiationModeAsync | InstantiationModeSync;
export interface InstantiationModeAsync {
  tag: 'async',
}
export interface InstantiationModeSync {
  tag: 'sync',
}
export interface GenerateOptions {
  name: string,
  noTypescript?: boolean,
  instantiation?: InstantiationMode,
  map?: Maps,
  compat?: boolean,
  noNodejsCompat?: boolean,
  base64Cutoff?: number,
  tlaCompat?: boolean,
  validLiftingOptimization?: boolean,
  tracing?: boolean,
  noNamespacedExports?: boolean,
}
export type Wit = WitSource | WitBinary | WitPath;
export interface WitSource {
  tag: 'source',
  val: string,
}
export interface WitBinary {
  tag: 'binary',
  val: Uint8Array,
}
export interface WitPath {
  tag: 'path',
  val: string,
}
export interface TypeGenerationOptions {
  wit: Wit,
  world?: string,
  tlaCompat?: boolean,
  instantiation?: InstantiationMode,
  map?: Maps,
}
/**
 * # Variants
 * 
 * ## `"function"`
 * 
 * ## `"instance"`
 */
export type ExportType = 'function' | 'instance';
export interface Transpiled {
  files: Files,
  imports: string[],
  exports: [string, ExportType][],
}
