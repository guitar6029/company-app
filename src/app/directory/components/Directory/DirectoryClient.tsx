"use client";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useQuery } from "@tanstack/react-query";

async function getEmployees() {
  try {
    const response = await fetch("http://localhost:3000/api/employees");
    return response.json();
  } catch (error) {
    console.error("Error fetching employees:", error);
    return [];
  }
}

export default function DirectoryCLient() {
  //fetch data
  const { data, isLoading, isError } = useQuery({
    queryKey: ["employees"],
    queryFn: getEmployees,
  });

  if (isError) {
    return <div>Error fetching employees.</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
