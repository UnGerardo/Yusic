export default interface DirApi {
  readDir: () => Promise<Array<string>>;
  log: (s: string) => Promise<void>;
}
