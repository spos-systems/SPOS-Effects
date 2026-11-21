import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { allEffects } from "@/lib/effects";

const validEffectIds = new Set(allEffects.map((e) => e.id));

export async function GET() {
  try {
    const stats = await db.effectStat.findMany({
      select: { effectId: true, views: true },
    });
    const views: Record<string, number> = {};
    for (const stat of stats) {
      views[stat.effectId] = stat.views;
    }
    return NextResponse.json({ views });
  } catch (error) {
    console.error("Failed to load stats:", error);
    return NextResponse.json({ views: {} }, { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { effectId?: string };
    const effectId = body.effectId;

    if (!effectId || !validEffectIds.has(effectId)) {
      return NextResponse.json({ error: "Invalid effectId" }, { status: 400 });
    }

    const stat = await db.effectStat.upsert({
      where: { effectId },
      create: { effectId, views: 1 },
      update: { views: { increment: 1 } },
    });

    return NextResponse.json({ effectId, views: stat.views });
  } catch (error) {
    console.error("Failed to record view:", error);
    return NextResponse.json({ error: "Failed to record view" }, { status: 500 });
  }
}
