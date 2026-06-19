import { defineAuth } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  groups: ["ADMIN", "BRIDE", "GROOM", "GUEST"],
  userAttributes: {
    preferredUsername: {
      mutable: true,
      required: false,
    },
    givenName: {
      mutable: true,
      required: true,
    },
    familyName: {
      mutable: true,
      required: true,
    },
  },
  multiFactor: {
    mode: "OPTIONAL",
    totp: true,
  },
  accountRecovery: "EMAIL_ONLY",
  passwordPolicy: {
    minLength: 8,
    requireLowercase: true,
    requireUppercase: true,
    requireNumbers: true,
    requireSymbols: false,
  },
});
