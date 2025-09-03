export const BUTTON_SIZE_CLASS = {
  sm: "h-9 min-w-[120px] px-3 text-xs",
  md: "h-11 min-w-[160px] px-5 text-sm",
  lg: "h-12 min-w-[260px] px-6 text-base",
} as const;

export const BUTTON_SIZE_CLASS_SM = {
  sm: "sm:h-9 sm:min-w-[120px] sm:px-3 sm:text-xs",
  md: "sm:h-11 sm:min-w-[160px] sm:px-5 sm:text-sm",
  lg: "sm:h-12 sm:min-w-[260px] sm:px-6 sm:text-base",
} as const;

export type ButtonSize = keyof typeof BUTTON_SIZE_CLASS;
