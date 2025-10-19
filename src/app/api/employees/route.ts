// app/api/employees/route.ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db/mongodb";
import { WithId, Document as MongoDocument } from "mongodb";

const parsePositiveInt = (v: string | null, fallback: number) => {
  const n = parseInt(v ?? "", 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
};

export async function GET(req: NextRequest) {
  try {
    // 1) calls the client promise for the database connection
    const client = await clientPromise;
    // if the client is not found, return an error
    if (!client) return NextResponse.error();
    // if found , connecto the db - company
    const db = client.db("company");

    //extract the query params
    const { searchParams } = new URL(req.url);
    //we are extracting the page and pageSize

    const page = parsePositiveInt(searchParams.get("page"), 1);
    const pageSize = Math.min(
      parsePositiveInt(searchParams.get("size"), 10),
      100
    );

    const filter = {}; // add filters later if needed
    // count the total number of documents
    const totalRows = await db.collection("employees").countDocuments(filter);

    //retrieve the documents based on the page and pageSize
    const docs = await db
      .collection("employees")
      .find(filter)
      .sort({ _id: 1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .toArray();

    // convert the _id, which is ObjectId("1234eaxmple") => to string
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
