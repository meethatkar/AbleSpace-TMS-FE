import { NextResponse, NextRequest } from "next/server";

export const dynamic = 'force-dynamic';

const NEST_URL = process.env.NEXT_PUBLIC_NEST_API;

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const response = await fetch(`${NEST_URL}/auth/guest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(authHeader ? { Authorization: authHeader } : {}),
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
