import { Employee } from "@/app/types/Employee";
import clientPromise from "@/lib/db/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client?.db("company");
    if (db) {
      const employeesCollection = db.collection<Employee>("employees");
      const employees = await employeesCollection.find({}).toArray();
      return new Response(JSON.stringify(employees), { status: 200 });
    } else {
      console.error("Database connection is not available.");
      return new Response("Database connection is not available.", {
        status: 500,
      });
    }
  } catch (error) {
    console.error("Error fetching employees:", error);
    return new Response("Error fetching employees.", { status: 500 });
  }
}
