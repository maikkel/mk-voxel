function prepend(message: string) {
  return `[mk-voxel] ${message}`;
}

export function log(message: string) {
  console.log(prepend(message));
}

export function logWarn(message: string) {
  console.warn(prepend(message));
}

export function logError(message: string) {
  console.error(prepend(message));
}

export function error(message: string) {
  throw new Error(prepend(message));
}
