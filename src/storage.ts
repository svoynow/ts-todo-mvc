export const store = <T>(key: string, data: T): void =>
  localStorage.setItem(key, JSON.stringify(data));

export const retrieve = <T>(key: string): T | null => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};
