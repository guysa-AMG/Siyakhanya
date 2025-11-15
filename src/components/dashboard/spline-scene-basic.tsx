'use client'

import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
 
export function SplineSceneBasic() {
  return (
    <Card className="w-full h-[500px] bg-card relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="hsl(var(--primary))"
      />
      
      <div className="flex h-full flex-col md:flex-row">
        {/* Left content */}
        <div className="flex-1 p-8 relative z-10 flex flex-col justify-center text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Smarter Energy, Brighter Futures.
          </h1>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto md:mx-0">
            siyaKhanya provides powerful tools for community energy planning. Predict demand, analyze financial viability, and ensure affordable, sustainable power for everyone.
          </p>
        </div>

        {/* Right content */}
        <div className="flex-1 relative h-64 md:h-full">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </Card>
  )
}
