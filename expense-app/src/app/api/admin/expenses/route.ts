import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// GET all expenses
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("expenseApp");
    const expenses = await db.collection("expenses").find().toArray();

    return NextResponse.json(expenses);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch expenses" }, { status: 500 });
  }
}
