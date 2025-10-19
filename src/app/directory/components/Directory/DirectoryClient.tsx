"use client";

import { Employee } from "@/app/types/Employee";

import { columns } from "./columns";
import { DataTable } from "./data-table";

interface DirectoryClientProps {
  data: Employee[];
}

export default function DirectoryCLient({ data }: DirectoryClientProps) {
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
