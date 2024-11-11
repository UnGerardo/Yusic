
export default interface Api {
  selectDir: () => Promise<string>;
  log: (s: string) => Promise<void>;
  openSettings: () => Promise<void>;
}
