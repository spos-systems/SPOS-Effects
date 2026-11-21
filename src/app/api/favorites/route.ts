import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { allEffects } from "@/lib/effects";

const validEffectIds = new Set(allEffects.map((e) => e.id));

export async function GET() {
  try {
    const favorites = await db.favorite.findMany({
      orderBy: { createdAt: "desc" },
      select: { effectId: true },
    });
    return NextResponse.json({ favorites: favorites.map((f) => f.effectId) });
  } catch (error) {
    console.error("Failed to load favorites:", error);
    return NextResponse.json({ favorites: [] }, { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { effectId?: string };
    const effectId = body.effectId;

    if (!effectId || !validEffectIds.has(effectId)) {
      return NextResponse.json({ error: "Invalid effectId" }, { status: 400 });
    }

    const existing = await db.favorite.findUnique({ where: { effectId } });

    if (existing) {
      await db.favorite.delete({ where: { effectId } });
      return NextResponse.json({ favorited: false, effectId });
    }

    await db.favorite.create({ data: { effectId } });
    return NextResponse.json({ favorited: true, effectId });
  } catch (error) {
    console.error("Failed to toggle favorite:", error);
    return NextResponse.json({ error: "Failed to toggle favorite" }, { status: 500 });
  }
}
