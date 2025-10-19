import Link from "next/link";
import { ModeToggle } from "../DarkModeToggle/Toggler";
export default function Header() {
  return (
    <header>
      <nav className="flex flex-row items-center justify-between p-2 dark:bg-neutral-900">
        <div className="flex flex-row items-center gap-2">
          <Link href="/">Company </Link>
          <Link href="/directory">Directory </Link>
          <Link href="/data">Data</Link>
          <Link href="/services">Services </Link>
          <Link href="/about">About </Link>
        </div>

        <div className="flex items-center gap-2">
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
