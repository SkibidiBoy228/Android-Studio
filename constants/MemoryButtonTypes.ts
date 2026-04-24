export const MemoryButtonTypes = {
  enabled: 'enabled',
  disabled: 'disabled',
} as const;

export type MemoryButtonType =
  (typeof MemoryButtonTypes)[keyof typeof MemoryButtonTypes];