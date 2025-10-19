import { Metadata } from "next";
import DirectoryClient from "./components/Directory/DirectoryClient";

export const metadata: Metadata = {
  title: "Directory",
  description: "Directory Page, get all employees",
};

export default async function DirectoryPage() {
  return (
    <div className="flex flex-col gap-2">
      <DirectoryClient />
    </div>
  );
}
