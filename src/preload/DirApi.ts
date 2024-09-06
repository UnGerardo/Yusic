export default interface DirApi {
  readDir: () => Promise<string[]>;
  log: (s: string) => Promise<void>;
}
