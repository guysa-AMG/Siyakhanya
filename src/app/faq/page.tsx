// Solar-Neighbour — kimmy@Solar-Neighbour
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { Header } from "@/components/dashboard/header";
import Link from "next/link";
  

export default function FaqPage() {
    return (
        <div className="flex min-h-screen w-full flex-col bg-background">
            <Header />
            <main className="flex-1 container mx-auto p-4 md:p-8">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h1>
                    <p className="text-muted-foreground mb-8">
                        Understand the data, metrics, and tools available on the Solar-Neighbour platform.
                    </p>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>What do we do to get started?</AccordionTrigger>
                            <AccordionContent>
                            we provide tools for a community or individual interested in alternative energy planning. It helps estimate future energy demand for a community, calculates the financial viability of solar power installations, and analyzes energy consumption data to find potential issues.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>How many do we have to be in a group to qualify?</AccordionTrigger>
                            <AccordionContent>
                                    we evaulate the information you gave us and determine from that if you qualify
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>what are the payment options"?</AccordionTrigger>
                            <AccordionContent>
                               we are payment flexable you can pay once off with the community member or in installments
                            </AccordionContent>
                        </AccordionItem>
                     <AccordionItem value="item-6">
                            <AccordionTrigger>whom do i contact when i have issue with the installation</AccordionTrigger>
                            <AccordionContent>
                            you contact our support team.
                           </AccordionContent>
                        </AccordionItem>
                         <AccordionItem value="item-7">
                            <AccordionTrigger>What are the "Model API Endpoints"?</AccordionTrigger>
                            <AccordionContent>
                            These are direct links to the prediction and calculation models running on this platform. Developers can use these URLs to integrate our forecasting and payback models into their own applications or services, without needing to rebuild the logic themselves.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </main>
            <footer className="py-4 text-center text-sm text-muted-foreground border-t">
                 <Link href="/" className="text-primary hover:underline">
                    Back to Dashboard
                </Link>
            </footer>
        </div>
    );
}
