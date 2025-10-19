import clientPromise from "@/lib/db/mongodb";
import DirectoryClient from "./components/Directory/DirectoryClient";
import { Employee } from "../types/Employee";

async function fetchEmployees() {
  try {
    const client = await clientPromise;
    const db = client?.db("company");
    // if db is defined, fetch employees
    if (db) {
      const employeesCollection = db.collection<Employee>("employees");
      const employees = await employeesCollection.find({}).toArray();
      console.log("Employees:", employees);
      return employees;
    } else {
      console.error("Database connection is not available.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching employees:", error);
    return [];
  }
}

export default async function DirectoryPage() {
  const employeesRaw = await fetchEmployees();
  const employees = JSON.parse(JSON.stringify(employeesRaw));

  return (
    <div className="flex flex-col gap-2">
      {/* the wrapper for the tanstack table goes here */}
      <DirectoryClient data={employees} />
    </div>
  );
}
