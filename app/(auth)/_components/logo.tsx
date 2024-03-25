import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";

const font = Poppins({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800"]
});

export const Logo  = () => {
    return (
        <div className="flex flex-col items-center gap-y-4">
            <div className="bg-white rounded-full p-1">
                <Image
                    src="/spooky.svg"
                    alt="Gamehub"
                    height="80"
                    width="80" 
                />
            </div>
            <div className={cn(
                "flex flex-col items-center",
                font.className
            )}>
                <p className={cn(
                    "text-xl font-semibold",
                    font.className
                )}>
                    Gamehub
                </p>
                <p 
                    className={cn(
                        "text-sm text-muted-foreground",
                        font.className
                )}>
                    Let's play
                </p>
            </div>
        </div>
    );
};