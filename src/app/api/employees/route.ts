// app/api/employees/route.ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db/mongodb";
import { WithId, Document as MongoDocument } from "mongodb";

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    if (!client) return NextResponse.error();
    const db = client.db("company");

    const { searchParams } = new URL(req.url);
    const page = Math.max(Number(searchParams.get("page") ?? 1), 1); // 1-based
    const pageSize = Math.min(
      Math.max(Number(searchParams.get("size") ?? 10), 1),
      100
    );

    const filter = {}; // add filters later if needed

    const totalRows = await db.collection("employees").countDocuments(filter);

    const docs = await db
      .collection("employees")
      .find(filter)
      .sort({ _id: 1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .toArray();

    const data = docs.map((d: WithId<MongoDocument>) => {
      const { _id, ...rest } = d;
      return { id: _id.toString(), ...rest };
    });
    const totalPages = Math.max(Math.ceil(totalRows / pageSize), 1);

    return NextResponse.json({
      data,
      page,
      pageSize,
      totalRows,
      totalPages,
      hasPrevPage: page > 1,
      hasNextPage: page < totalPages,
    });
  } catch (error) {
    console.error("Error fetching employees:", error);
    return new NextResponse("Error fetching employees.", { status: 500 });
  }
}
