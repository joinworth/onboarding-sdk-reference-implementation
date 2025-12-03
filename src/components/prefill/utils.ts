/**
 * Converts form input value to the appropriate type based on input type
 * @param value - The raw string value from the input
 * @param type - The HTML input type
 * @param checked - Whether checkbox is checked (for checkbox inputs)
 * @returns The converted value with proper type
 */
export const convertFormValue = (
  value: string,
  type: string,
  checked?: boolean,
): string | number | boolean => {
  switch (type) {
    case 'checkbox':
      return checked ?? false;

    case 'number': {
      const numValue = Number(value);
      return Number.isNaN(numValue) ? 0 : numValue;
    }
    default:
      return value;
  }
};
