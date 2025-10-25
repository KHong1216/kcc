import { Link } from "react-router";
import { Separator } from "./ui/separator";
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
    return (
        <nav className="flex px-20 h-16 items-center justify-between fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
            <div className="flex items-center">
                <Link to="/" className="font-bold text-lg text-blue-600 hover:text-blue-800">
                KOI Creative Lab
                </Link>
                <Separator orientation="vertical" className="h-6 mx-4" />
                <NavigationMenu>
                    <NavigationMenuList>
                        {menus.map((menu) => (
                            <NavigationMenuItem key={menu.name}>
                                {menu.items ? (
                                    <>
                                        <NavigationMenuTrigger>{menu.name}</NavigationMenuTrigger>
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
                                            className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
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
        </nav>
    )
}