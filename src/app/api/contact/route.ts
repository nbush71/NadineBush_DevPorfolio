import { NextResponse } from "next/server";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDb } from "@/lib/firebase";

const fail = (error: string, status: number) => NextResponse.json({ error }, { status });

async function parseBody(req: Request) {
  const contentType = req.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return (await req.json().catch(() => null)) as Record<string, unknown> | null;
  }

  if (contentType.includes("multipart/form-data") || contentType.includes("application/x-www-form-urlencoded")) {
    const formData = await req.formData().catch(() => null);
    if (!formData) return null;
    return Object.fromEntries(formData.entries());
  }

  return null;
}

export async function POST(req: Request) {
  const body = await parseBody(req);
  if (!body) return fail("The request could not be read. Please try again.", 400);

  const website = typeof body.website === "string" ? body.website.trim() : "";
  if (website) return NextResponse.json({ ok: true }); // honeypot: bots fill this in

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || name.length > 100) return fail("Enter your name (100 characters max).", 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) return fail("Enter a valid email address.", 400);
  if (message.length < 10 || message.length > 3000) return fail("Write a message between 10 and 3,000 characters.", 400);

  const db = getDb();
  if (!db) return fail("Messages are not set up yet. Please use LinkedIn for now.", 503);

  try {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    try {
      await Promise.race([
        addDoc(collection(db, "messages"), { name, email, message, createdAt: serverTimestamp() }),
        new Promise((_, reject) => {
          timeout = setTimeout(() => reject(new Error("Firestore write timed out.")), 8000);
        }),
      ]);
    } finally {
      if (timeout) clearTimeout(timeout);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to save contact message to Firestore:", error);
    const message = error instanceof Error && error.message === "Firestore write timed out."
      ? "The contact service is unavailable right now. Please try again in a moment or reach out on LinkedIn."
      : "Your message could not be saved. Please try again in a moment.";

    return fail(message, 503);
  }
}
