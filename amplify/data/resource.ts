import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*
 * Wedding App — Amplify Gen 2 Data Schema
 * Couple: Jhoana Cardenas & Damariel Causey
 * Events: Colombia (Nov 2026) + USA (Dec 2026)
 */
const schema = a.schema({
  // ─── Guest ────────────────────────────────────────────────────────────────
  Guest: a
    .model({
      firstName: a.string().required(),
      lastName: a.string().required(),
      email: a.email(),
      phone: a.phone(),
      invitationCode: a.string().required(),
      guestType: a.enum([
        "COLOMBIA_ONLY",
        "USA_ONLY",
        "BOTH",
        "CHOOSE_ONE",
        "BRIDAL_PARTY",
      ]),
      plusOneAllowed: a.boolean().default(false),
      tableNumber: a.integer(),
      side: a.enum(["BRIDE", "GROOM", "BOTH"]),
      notes: a.string(),
      // Relations
      rsvp: a.hasOne("RSVP", "guestId"),
      travelInfo: a.hasOne("TravelInfo", "guestId"),
    })
    .authorization((allow) => [
      allow.groups(["ADMIN", "BRIDE", "GROOM"]).to(["create", "read", "update", "delete"]),
      allow.owner().to(["read", "update"]),
    ]),

  // ─── RSVP ─────────────────────────────────────────────────────────────────
  RSVP: a
    .model({
      guestId: a.id().required(),
      guest: a.belongsTo("Guest", "guestId"),
      status: a.enum(["PENDING", "ACCEPTED", "DECLINED"]),
      colombiaAttending: a.boolean(),
      usaAttending: a.boolean(),
      submittedAt: a.datetime(),
      // Relations
      plusOnes: a.hasMany("PlusOne", "rsvpId"),
      mealPreferences: a.hasMany("MealPreference", "rsvpId"),
    })
    .authorization((allow) => [
      allow.groups(["ADMIN", "BRIDE", "GROOM"]).to(["create", "read", "update", "delete"]),
      allow.owner().to(["create", "read", "update"]),
    ]),

  // ─── Plus One ─────────────────────────────────────────────────────────────
  PlusOne: a
    .model({
      rsvpId: a.id().required(),
      rsvp: a.belongsTo("RSVP", "rsvpId"),
      firstName: a.string().required(),
      lastName: a.string().required(),
      email: a.email(),
      mealPreference: a.hasOne("MealPreference", "plusOneId"),
    })
    .authorization((allow) => [
      allow.groups(["ADMIN", "BRIDE", "GROOM"]).to(["create", "read", "update", "delete"]),
      allow.owner().to(["create", "read", "update"]),
    ]),

  // ─── Meal Preference ──────────────────────────────────────────────────────
  MealPreference: a
    .model({
      rsvpId: a.id(),
      rsvp: a.belongsTo("RSVP", "rsvpId"),
      plusOneId: a.id(),
      plusOne: a.belongsTo("PlusOne", "plusOneId"),
      entree: a.enum([
        "FILET_MIGNON",
        "PAN_SEARED_SALMON",
        "MUSHROOM_RISOTTO",
        "HERB_ROASTED_CHICKEN",
      ]),
      dietaryRestrictions: a.string(),
      eventType: a.enum(["COLOMBIA", "USA"]),
    })
    .authorization((allow) => [
      allow.groups(["ADMIN", "BRIDE", "GROOM"]).to(["create", "read", "update", "delete"]),
      allow.owner().to(["create", "read", "update"]),
    ]),

  // ─── Travel Information ───────────────────────────────────────────────────
  TravelInfo: a
    .model({
      guestId: a.id().required(),
      guest: a.belongsTo("Guest", "guestId"),
      flightBooked: a.boolean().default(false),
      hotelBooked: a.boolean().default(false),
      shuttleNeeded: a.boolean().default(false),
      colombiaArrival: a.date(),
      colombiaDeparture: a.date(),
      usaArrival: a.date(),
      usaDeparture: a.date(),
      notes: a.string(),
    })
    .authorization((allow) => [
      allow.groups(["ADMIN", "BRIDE", "GROOM"]).to(["create", "read", "update", "delete"]),
      allow.owner().to(["create", "read", "update"]),
    ]),

  // ─── Event ────────────────────────────────────────────────────────────────
  Event: a
    .model({
      name: a.string().required(),
      date: a.datetime().required(),
      location: a.string().required(),
      address: a.string(),
      description: a.string(),
      type: a.enum(["CEREMONY", "COCKTAIL", "RECEPTION", "DINNER", "OPTIONAL", "BRIDAL_PARTY"]),
      weddingLocation: a.enum(["COLOMBIA", "USA", "BOTH"]),
      dressCode: a.string(),
      capacity: a.integer(),
      isPublic: a.boolean().default(true),
      sortOrder: a.integer(),
    })
    .authorization((allow) => [
      allow.groups(["ADMIN", "BRIDE", "GROOM"]).to(["create", "read", "update", "delete"]),
      allow.guest().to(["read"]),
    ]),

  // ─── Announcement ─────────────────────────────────────────────────────────
  Announcement: a
    .model({
      title: a.string().required(),
      body: a.string().required(),
      isActive: a.boolean().default(true),
      targetGroup: a.enum(["ALL", "COLOMBIA", "USA", "BRIDAL_PARTY"]),
      publishedAt: a.datetime(),
    })
    .authorization((allow) => [
      allow.groups(["ADMIN", "BRIDE", "GROOM"]).to(["create", "read", "update", "delete"]),
      allow.guest().to(["read"]),
    ]),
});

export type Schema = typeof schema;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    apiKeyAuthorizationConfig: {
      expiresInDays: 30,
    },
  },
});
