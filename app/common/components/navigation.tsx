import { Link } from "react-router";
import { Separator } from "./ui/separator";
import { useState } from "react";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent,
    NavigationMenuLink
} from "./ui/navigation-menu";

const menus = [
    {
        name: "연애",
        to: "/love"
    },
    {
        name: "무색무취 매거진",
        to: "/magazine"
    },
    {
        name: "북스테이 - 에세이캠프",
        to: "/bookstay"
    }
];

export function Navigation() {
    return (
        <nav className="flex px-2 sm:px-4 lg:px-20 h-12 sm:h-14 lg:h-16 items-center fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
            {/* 로고 - 고정 */}
            <div className="flex items-center flex-shrink-0 mr-2 sm:mr-4">
                <Link to="/" className="font-bold text-sm sm:text-base lg:text-lg text-blue-600 hover:text-blue-800">
                    KOI
                </Link>
                <Separator orientation="vertical" className="h-6 mx-2 sm:mx-4" />
            </div>
            
            {/* 스크롤 가능한 메뉴 영역 */}
            <div className="flex-1 overflow-x-auto scrollbar-hide">
                <NavigationMenu>
                    <NavigationMenuList className="flex space-x-1 sm:space-x-2 min-w-max">
                        {menus.map((menu) => (
                            <NavigationMenuItem key={menu.name} className="flex-shrink-0">
                                <NavigationMenuLink asChild>
                                    <Link
                                        to={menu.to}
                                        className="group inline-flex h-8 w-max items-center justify-center rounded-md bg-background px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 whitespace-nowrap"
                                    >
                                        {menu.name}
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </nav>
    )
}