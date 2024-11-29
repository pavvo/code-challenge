export const VALID_CHARACTERS = new Set([
  '@', // Start
  'x', // End
  '-', // Horizontal path
  '|', // Vertical path
  '+', // Turn
  ' ', // Empty space
  ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)), // A-Z
]);
