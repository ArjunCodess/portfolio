import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { ChatTrigger } from "@/components/chat-trigger";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata: Metadata = {
    metadataBase: new URL(DATA.url),
    title: {
        default: DATA.name + ' (' + DATA.personalBrand + ') - Portfolio',
        template: `%s | ${DATA.name}`,
    },
    description: DATA.description,
    openGraph: {
        title: `${DATA.name} (${DATA.personalBrand}) - Portfolio`,
        description: DATA.description,
        url: DATA.url,
        siteName: `${DATA.name} (${DATA.personalBrand}) - Portfolio`,
        locale: "en_US",
        type: "website",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    twitter: {
        title: `${DATA.name} (${DATA.personalBrand}) - Portfolio`,
        card: "summary_large_image",
    },
    verification: {
        google: "",
        yandex: "",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased",
                    fontSans.variable
                )}
            >
                <ThemeProvider attribute="class" defaultTheme="light">
                    <TooltipProvider delayDuration={0}>
                        <SidebarProvider defaultOpen={false}>
                            <SidebarInset>
                                <div className="max-w-2xl mx-auto py-16 sm:pb-24 px-2">
                                    {children}
                                    <Navbar />
                                    <Analytics />
                                    <SpeedInsights />
                                </div>
                            </SidebarInset>
                            <ChatTrigger />
                            <AppSidebar side="right" />
                        </SidebarProvider>
                    </TooltipProvider>
                </ThemeProvider>
            </body>
        </html>
    );
};