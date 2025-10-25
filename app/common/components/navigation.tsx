import { Link } from "react-router";
import { Separator } from "./ui/separator";
import { useState } from "react";
import { Menu, X } from "lucide-react";
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
        name: "소개",
        to: "/about",
        items: [
            {
                name: "대표 소개",
                to: "/about",
            },
            {
                name: "코이 매니저 소개",
                to: "/about/managers",
            },
        ]
    },
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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="flex px-4 sm:px-6 lg:px-20 h-12 sm:h-14 lg:h-16 items-center justify-between fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
            {/* 로고 */}
            <div className="flex items-center">
                <Link to="/" className="font-bold text-sm sm:text-base lg:text-lg text-blue-600 hover:text-blue-800">
                    KOI
                </Link>
                
                {/* 데스크톱에서만 구분선과 메뉴 표시 */}
                <div className="hidden lg:flex items-center">
                    <Separator orientation="vertical" className="h-6 mx-4" />
                    <NavigationMenu>
                        <NavigationMenuList>
                            {menus.map((menu) => (
                                <NavigationMenuItem key={menu.name}>
                                    {menu.items ? (
                                        <>
                                            <NavigationMenuTrigger className="text-sm">{menu.name}</NavigationMenuTrigger>
                                            <NavigationMenuContent>
                                                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-white border border-gray-200 rounded-lg shadow-lg">
                                                    {menu.items.map((item) => (
                                                        <li key={item.name}>
                                                            <NavigationMenuLink asChild>
                                                                <Link
                                                                    to={item.to}
                                                                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-700 focus:bg-blue-50 focus:text-blue-700 text-gray-700"
                                                                >
                                                                    <div className="text-sm font-medium leading-none">
                                                                        {item.name}
                                                                    </div>
                                                                </Link>
                                                            </NavigationMenuLink>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </NavigationMenuContent>
                                        </>
                                    ) : (
                                        <NavigationMenuLink asChild>
                                            <Link
                                                to={menu.to}
                                                className="group inline-flex h-8 w-max items-center justify-center rounded-md bg-background px-3 py-1 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                                            >
                                                {menu.name}
                                            </Link>
                                        </NavigationMenuLink>
                                    )}
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </div>

            {/* 모바일 메뉴 버튼 */}
            <button
                className="lg:hidden p-1.5 rounded-md hover:bg-gray-100 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="메뉴 열기/닫기"
            >
                {isMobileMenuOpen ? (
                    <X className="h-4 w-4" />
                ) : (
                    <Menu className="h-4 w-4" />
                )}
            </button>

            {/* 모바일 메뉴 */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg lg:hidden">
                    <div className="px-4 py-2 space-y-1">
                        {menus.map((menu) => (
                            <div key={menu.name}>
                                {menu.items ? (
                                    <div className="py-2">
                                        <div className="text-sm font-semibold text-gray-900 mb-2">
                                            {menu.name}
                                        </div>
                                        <div className="pl-4 space-y-1">
                                            {menu.items.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    to={item.to}
                                                    className="block py-1.5 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        to={menu.to}
                                        className="block py-1.5 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {menu.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    )
}