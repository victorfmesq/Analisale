const isNullOrUndefinedOrEmpty = <T>(
  value: T | null | undefined | string | T[],
): boolean => {
  if (value === null || value === undefined || value.length === 0) {
    return true;
  }

  if (typeof value === "string" && value.trim() === "") {
    return true;
  }

  return false;
};

export default isNullOrUndefinedOrEmpty;
