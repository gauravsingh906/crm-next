"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    return (
        <div
            className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
        >
            <Menu setActive={setActive}>
                <Link href={'/chart'}>
                    <MenuItem setActive={setActive} active={active} item="Chart">
                    </MenuItem>
                </Link>

                <Link href={'/profile'}>
                    <MenuItem setActive={setActive} active={active} item="Profile">
                    </MenuItem>
                </Link>

                <Link href={'/stats'}>
                    <MenuItem setActive={setActive} active={active} item="Stats">
                    </MenuItem>
                </Link>
                <Link href={'/content'}>
                    <MenuItem setActive={setActive} active={active} item="Site-Content">
                    </MenuItem>
                </Link>
            </Menu>
        </div>
    )
}

export default Navbar