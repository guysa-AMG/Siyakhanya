// siyaKhanya — kimmy@siyaKhanya
'use client';

import { Button } from "@/components/ui/button";
import { Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";


export function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b bg-background z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="bg-primary text-primary-foreground p-2 rounded-lg">
             <Sun className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">siyaKhanya</h1>
        </Link>
        <div className="flex items-center gap-4">
            <p className="text-muted-foreground hidden md:block">Community energy forecasting & payback</p>
            {pathname !== '/faq' && (
                <Button asChild variant="ghost">
                    <Link href="/faq">FAQ</Link>
                </Button>
            )}
            {pathname !== '/dashboard' && pathname !== '/' && (
                 <Button asChild variant="ghost">
                    <Link href="/dashboard">Dashboard</Link>
                </Button>
            )}
        </div>
      </div>
    </header>
  );
}
