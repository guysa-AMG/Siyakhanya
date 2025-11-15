// siyaKhanya — kimmy@siyaKhanya
'use client';

import { SplineSceneBasic } from '@/components/dashboard/spline-scene-basic';
import { Header } from '@/components/dashboard/header';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-8 flex flex-col items-center justify-center text-center">
        <div className="max-w-4xl w-full">
            <SplineSceneBasic />
            <div className="mt-8">
                 <Button asChild size="lg">
                    <Link href="/dashboard">
                        Go to Dashboard
                        <ArrowRight className="ml-2"/>
                    </Link>
                </Button>
            </div>
        </div>
      </main>
      <footer className="py-4 text-center text-sm text-muted-foreground border-t">
        <span>© siyaKhanya</span>
      </footer>
    </div>
  );
}
