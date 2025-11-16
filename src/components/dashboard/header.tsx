// Solar-Neighbour — kimmy@Solar-Neighbour
'use client';

import { Button } from "@/components/ui/button";
import { LucidePower } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";


export function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b bg-background z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="bg-primary text-primary-foreground p-2 rounded-lg">
             <LucidePower />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Solar-Neighbour</h1>
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/projects">Projects</Link>
            <Link href="/create-project">Create a Project</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
