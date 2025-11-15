// siyaKhanya — kimmy@siyaKhanya
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
                        Understand the data, metrics, and tools available on the siyaKhanya platform.
                    </p>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>What is this website for?</AccordionTrigger>
                            <AccordionContent>
                            This platform provides tools for community energy planning. It helps estimate future energy demand for a community, calculates the financial viability of solar power installations, and analyzes energy consumption data to find potential issues.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>What does the "Hourly Demand" chart show?</AccordionTrigger>
                            <AccordionContent>
                            This chart predicts the total amount of electricity (in kilowatt-hours, kWh) a community is expected to use for each hour of the next 24 hours. This helps in understanding peak usage times and planning for sufficient energy supply.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>What is the "Scenario Builder"?</AccordionTrigger>
                            <AccordionContent>
                                The Scenario Builder is a tool to test the financial viability of a solar and battery system. You can input different system sizes and electricity prices to see if the investment makes financial sense.
                                <ul className="list-disc pl-6 mt-4 space-y-2">
                                    <li><strong>System kWp (kilowatt-peak):</strong> This is the maximum power the solar panels can generate under ideal sunny conditions. A higher number means a bigger solar panel system.</li>
                                    <li><strong>Battery kWh (kilowatt-hour):</strong> This is the amount of energy the battery can store. A larger battery can power a home for longer when the sun isn't shining.</li>
                                    <li><strong>Grid Price (ZAR/kWh):</strong> This is the price you pay for electricity from the national grid (like Eskom). This is used to calculate how much money you save by using your own solar power instead.</li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                            <AccordionTrigger>What do "Payback Period" and "NPV" mean?</AccordionTrigger>
                            <AccordionContent>
                                These are financial metrics to judge an investment.
                                <ul className="list-disc pl-6 mt-4 space-y-2">
                                    <li><strong>Payback Period:</strong> This is the time it takes for the savings from your solar system to equal the initial cost of installing it. A shorter payback period is generally better.</li>
                                    <li><strong>Net Present Value (NPV):</strong> This tells you how profitable the investment is over its entire lifespan (e.g., 20 years), considering all future savings and costs. A positive NPV means the investment is expected to be profitable.</li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-5">
                            <AccordionTrigger>What is "Affordability Analysis"?</AccordionTrigger>
                            <AccordionContent>
                            This tool provides a recommendation for the maximum electricity tariff (price per kWh) that a community can afford. Setting prices above this threshold could increase the financial burden on residents, potentially leading some to resort to unsafe, illegal electricity connections.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-6">
                            <AccordionTrigger>What is "Consumption Data Analysis"?</AccordionTrigger>
                            <AccordionContent>
                            This feature uses AI to analyze electricity usage data from a CSV file. It can automatically detect unusual patterns, such as sudden spikes or drops in consumption, which might indicate faulty meters, energy theft, or other issues that need investigation.
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
