export function keyMirror<T extends Record<PropertyKey, unknown>>(
  obj: T
): { [K in keyof T]: K } {
  const mirrored: Partial<Record<keyof T, keyof T>> = {}
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      mirrored[key as keyof T] = key as keyof T
    }
  }
  return mirrored as { [K in keyof T]: K }
}
