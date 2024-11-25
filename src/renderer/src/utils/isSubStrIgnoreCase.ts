
const isSubstrIgnoreCase = (string: string, substr: string): boolean => {
  return string.toLocaleLowerCase().includes(substr.toLocaleLowerCase());
}

export default isSubstrIgnoreCase;