export const TokenType = {
  ACCESS_TOKEN: "ACCESS_TOKEN",
  REFRESH_TOKEN: "REFRESH_TOKEN",
} as const;

export type TokenType = (typeof TokenType)[keyof typeof TokenType];
