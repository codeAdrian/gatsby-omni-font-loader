export const arrayCheck = (arr?: unknown) =>
  arr && Array.isArray(arr) && Boolean(arr.length)
