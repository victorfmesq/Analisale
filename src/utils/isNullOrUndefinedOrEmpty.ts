const isNullOrUndefinedOrEmpty = <T>(
  value: T | null | undefined | string | T[],
): boolean => {
  if (value === null || value === undefined) {
    return true;
  }

  if (typeof value === "string" && value.trim() === "") {
    return true;
  }

  if (Array.isArray(value) && value.length === 0) {
    return true;
  }

  if (typeof value === "object" && Object.keys(value).length === 0) {
    return true;
  }

  return false;
};

export default isNullOrUndefinedOrEmpty;
