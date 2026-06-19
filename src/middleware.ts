import { NextRequest, NextResponse } from "next/server";
import { fetchAuthSession } from "aws-amplify/auth/server";
import { runWithAmplifyServerContext } from "@aws-amplify/adapter-nextjs";
import outputs from "../amplify_outputs.json";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all /admin/* routes except /admin/login
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    try {
      const session = await runWithAmplifyServerContext(
        { amplifyConfig: outputs },
        { request },
        (ctx) => fetchAuthSession(ctx)
      );

      if (!session.tokens?.idToken) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }

      const groups = (session.tokens.idToken.payload["cognito:groups"] as string[] | undefined) ?? [];
      const isAuthorized = groups.some((g) => ["ADMIN", "BRIDE", "GROOM"].includes(g));

      if (!isAuthorized) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
