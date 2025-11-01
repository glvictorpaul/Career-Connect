import { NextResponse } from "next/server";

const API_BASE_URL =
  "http://localhost:5001/api" || "http://localhost:5001/api";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    const url = userId
      ? `${API_BASE_URL}/posts?userId=${userId}`
      : `${API_BASE_URL}/posts`;

    const response = await fetch(url, { cache: "no-store" }); // prevent Next.js caching
    if (!response.ok) {
      throw new Error(`Backend returned ${response.status}`);
    }

    const posts = await response.json();
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error("GET /api/posts error:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    // Log to debug if backend gives 400
    console.log("Frontend POST body:", body);

    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const post = await response.json();

    if (!response.ok) {
      console.error("Backend POST error:", post);
      return NextResponse.json(
        { error: post.message || "Failed to create post" },
        { status: response.status }
      );
    }

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("POST /api/posts error:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
