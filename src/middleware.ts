/**
 * ============================================================================
 * MEDIASPHERE AI — NEXT.JS SECURITY & LICENSE MIDDLEWARE
 * Copyright (C) 2026 Pushkar (pushka2006). All Rights Reserved.
 * ============================================================================
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Attach non-removable proprietary licensing and copyright headers
  response.headers.set("X-Software-Owner", "Pushkar (pushka2006)");
  response.headers.set("X-Software-License", "Proprietary Commercial - All Rights Reserved");
  response.headers.set("X-Copyright", "Copyright (C) 2026 Pushkar. All Rights Reserved.");
  response.headers.set("X-License-Penalty", "Unauthorized use: $1,000 USD fine / 30 days / Criminal prosecution");

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for static files, _next, favicon
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
