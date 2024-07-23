export interface DirApi {
  readDir: () => Promise<Array<string>>
}
