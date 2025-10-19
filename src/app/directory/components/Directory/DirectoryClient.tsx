"use client";

import { useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Employee } from "@/app/types/Employee";


type EmployeeResponse = {
  data: Employee[];
  totalRows: number;
  page: number;
  pageSize: number;
}

async function getEmployees(pageIndex: number, pageSize: number) {
  try {
    const page = pageIndex + 1; // based on initial 1-based page
    const response = await fetch(
      `http://localhost:3000/api/employees?page=${page}&size=${pageSize}`,
      { cache: "no-store" }
    );
    const data = await response.json();
    console.log("API RESPONSE", data);
    return data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    return {data: [], page: 1, pageSize: 10, totalRows: 0, totalPages: 0};
  }
}

export default function DirectoryCLient() {


  //pagination state
  const [ pageIndex, setPageIndex] = useState(0);
  const [ pageSizeState, setPageSizeState] = useState(10);


  //fetch data
  const { data, isLoading, isError } = useQuery({
    queryKey: ["employees", pageIndex, pageSizeState],
    queryFn: () : Promise<EmployeeResponse> => getEmployees(pageIndex, pageSizeState),
    placeholderData: keepPreviousData
  });

  if (isError) {
    return <div>Error fetching employees.</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const employees = data?.data ?? [];
  const totalRows = data?.totalRows ?? 0;
  const page = data?.page ?? 1;
  const pageSize = data?.pageSize ?? 10;

  return (
    <div>
      <DataTable
        columns={columns}
        data={employees}
        totalRows={totalRows}
        page={page}
        pageSize={pageSize}
        onPageIndexChange={setPageIndex}
        onPageSizeChange={setPageSizeState}
      />
    </div>
  );
}
