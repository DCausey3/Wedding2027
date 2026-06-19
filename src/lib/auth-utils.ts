import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";
import { fetchAuthSession as fetchServerSession } from "aws-amplify/auth/server";
import { runWithAmplifyServerContext } from "@aws-amplify/adapter-nextjs";
import { cookies } from "next/headers";
import outputs from "../../amplify_outputs.json";
import type { AuthUser, UserGroup } from "@/types";

// ─── Server-side auth (Server Components / Middleware) ────────────────────────

export async function getServerAuthUser(): Promise<AuthUser | null> {
  try {
    const session = await runWithAmplifyServerContext(
      { amplifyConfig: outputs },
      { request: { headers: { cookie: (await cookies()).toString() } } },
      (ctx) => fetchServerSession(ctx)
    );

    if (!session.tokens?.idToken) return null;

    const payload = session.tokens.idToken.payload;
    const groups = (payload["cognito:groups"] as string[] | undefined) ?? [];

    return {
      userId: payload.sub as string,
      username: payload["cognito:username"] as string,
      email: payload.email as string | undefined,
      groups: groups as UserGroup[],
      isAdmin: groups.includes("ADMIN"),
      isBrideOrGroom: groups.some((g) => ["ADMIN", "BRIDE", "GROOM"].includes(g)),
    };
  } catch {
    return null;
  }
}

// ─── Client-side helpers ──────────────────────────────────────────────────────

export async function getClientAuthUser(): Promise<AuthUser | null> {
  try {
    const [user, session] = await Promise.all([
      getCurrentUser(),
      fetchAuthSession(),
    ]);
    const payload = session.tokens?.idToken?.payload;
    const groups = (payload?.["cognito:groups"] as string[] | undefined) ?? [];

    return {
      userId: user.userId,
      username: user.username,
      email: payload?.email as string | undefined,
      groups: groups as UserGroup[],
      isAdmin: groups.includes("ADMIN"),
      isBrideOrGroom: groups.some((g) => ["ADMIN", "BRIDE", "GROOM"].includes(g)),
    };
  } catch {
    return null;
  }
}

export function requireAdminRole(user: AuthUser | null): void {
  if (!user?.isBrideOrGroom) {
    throw new Error("Unauthorized: Admin access required");
  }
}
