import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// GET company settings
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("expenseApp");
    const company = await db.collection("companies").findOne({});
    return NextResponse.json(company);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch company" }, { status: 500 });
  }
}

// UPDATE company settings
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { name, settings } = body;

    const client = await clientPromise;
    const db = client.db("expenseApp");

    const result = await db.collection("companies").updateOne(
      {},
      { $set: { name, settings, updatedAt: new Date() } },
      { upsert: true }
    );

    return NextResponse.json({ message: "Company updated", result });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update company" }, { status: 500 });
  }
}
