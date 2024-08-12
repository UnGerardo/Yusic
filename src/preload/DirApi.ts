export default interface DirApi {
  readDir: () => Promise<Array<string>>;
}
