export function extendSearchParams(param?: Record<string, any>): string {
  const searchParams = new URLSearchParams();

  if (param && typeof param === 'object') {
    Object.entries(param).forEach(([key, value]) => {
      if (value === undefined) return; // Skip undefined values

      if (typeof value === 'object' && value !== null) {
        Object.entries(value).forEach(([subKey, subValue]) => {
          if (subValue !== undefined) {
            searchParams.append(subKey, String(subValue));
          }
        });
      } else {
        searchParams.append(key, String(value));
      }
    });
  }

  return searchParams.toString();
}
