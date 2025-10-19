"use client";

import Link from "next/link";
import { ModeToggle } from "../DarkModeToggle/Toggler";
import { usePathname } from "next/navigation";
export default function Header() {
  const currentPath = usePathname();

  function getLinkStyle(path: string) {
    if (path === currentPath) {
      return "text-neutral-50 border-2 border-neutral-50";
    }

    return "text-neutral-400 border-2 border-transparent";
  }

  return (
    <header>
      <nav className="flex flex-row items-center justify-between p-2 dark:bg-neutral-900">
        <div className="flex flex-row items-center gap-2">
          <Link href="/">Home</Link>
          <Link
            href="/directory"
            className={`${getLinkStyle("/directory")} rounded-xl p-2`}
          >
            Directory{" "}
          </Link>
          <Link
            href="/data"
            className={`${getLinkStyle("/data")} rounded-xl p-2`}
          >
            Data
          </Link>
          <Link
            href="/services"
            className={`${getLinkStyle("/services")} rounded-xl p-2`}
          >
            Services{" "}
          </Link>
          <Link
            href="/about"
            className={`${getLinkStyle("/about")} rounded-xl p-2`}
          >
            About{" "}
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
