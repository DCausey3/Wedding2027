// ─── Enums ────────────────────────────────────────────────────────────────────

export type GuestType =
  | "COLOMBIA_ONLY"
  | "USA_ONLY"
  | "BOTH"
  | "CHOOSE_ONE"
  | "BRIDAL_PARTY";

export type RSVPStatus = "PENDING" | "ACCEPTED" | "DECLINED";

export type WeddingLocation = "COLOMBIA" | "USA" | "BOTH";

export type Entree =
  | "FILET_MIGNON"
  | "PAN_SEARED_SALMON"
  | "MUSHROOM_RISOTTO"
  | "HERB_ROASTED_CHICKEN";

export type EventType =
  | "CEREMONY"
  | "COCKTAIL"
  | "RECEPTION"
  | "DINNER"
  | "OPTIONAL"
  | "BRIDAL_PARTY";

export type UserGroup = "ADMIN" | "BRIDE" | "GROOM" | "GUEST";

// ─── Domain Models ────────────────────────────────────────────────────────────

export interface Guest {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  invitationCode: string;
  guestType: GuestType;
  plusOneAllowed: boolean;
  tableNumber?: number;
  side?: "BRIDE" | "GROOM" | "BOTH";
  notes?: string;
  rsvp?: RSVP;
  travelInfo?: TravelInfo;
  createdAt: string;
  updatedAt: string;
}

export interface RSVP {
  id: string;
  guestId: string;
  guest?: Guest;
  status: RSVPStatus;
  colombiaAttending?: boolean;
  usaAttending?: boolean;
  submittedAt?: string;
  plusOnes?: PlusOne[];
  mealPreferences?: MealPreference[];
  createdAt: string;
  updatedAt: string;
}

export interface PlusOne {
  id: string;
  rsvpId: string;
  firstName: string;
  lastName: string;
  email?: string;
  mealPreference?: MealPreference;
}

export interface MealPreference {
  id: string;
  rsvpId?: string;
  plusOneId?: string;
  entree: Entree;
  dietaryRestrictions?: string;
  eventType: WeddingLocation;
}

export interface TravelInfo {
  id: string;
  guestId: string;
  flightBooked: boolean;
  hotelBooked: boolean;
  shuttleNeeded: boolean;
  colombiaArrival?: string;
  colombiaDeparture?: string;
  usaArrival?: string;
  usaDeparture?: string;
  notes?: string;
}

export interface WeddingEvent {
  id: string;
  name: string;
  date: string;
  location: string;
  address?: string;
  description?: string;
  type: EventType;
  weddingLocation: WeddingLocation;
  dressCode?: string;
  capacity?: number;
  isPublic: boolean;
  sortOrder?: number;
}

// ─── UI / Form Types ──────────────────────────────────────────────────────────

export interface RSVPFormData {
  invitationCode: string;
  attendance: "COLOMBIA" | "USA" | "BOTH" | "DECLINE" | null;
  plusOneName?: string;
  plusOneLastName?: string;
  primaryEntree: Entree | "";
  plusOneEntree?: Entree | "";
  dietaryRestrictions?: string;
  plusOneDietary?: string;
  flightBooked: boolean;
  hotelBooked: boolean;
  shuttleNeeded: boolean;
  notes?: string;
}

// ─── Dashboard Analytics ──────────────────────────────────────────────────────

export interface DashboardStats {
  totalInvited: number;
  accepted: number;
  declined: number;
  pending: number;
  colombiaCount: number;
  usaCount: number;
  bothCount: number;
  plusOneCount: number;
  travelReadiness: {
    flightsBooked: number;
    hotelsBooked: number;
    shuttlesNeeded: number;
  };
  mealBreakdown: Record<Entree, number>;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export interface AuthUser {
  userId: string;
  username: string;
  email?: string;
  groups: UserGroup[];
  isAdmin: boolean;
  isBrideOrGroom: boolean;
}
