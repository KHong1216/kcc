import { Link } from "react-router";
import { Separator } from "./ui/separator";
import { cn } from "~/lib/utils";
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
        to: "/about/representative",
        items: [
            {
                name: "대표자 소개",
                description: "코이창작소의 대표자와 비전을 소개합니다",
                to: "/about/representative",
            },
            {
                name: "상담사 소개",
                description: "전문 상담진을 소개합니다",
                to: "/about/counselors",
            }
        ]
    },
    {
        name: "프로젝트",
        to: "/camps/love",
        items: [
            {
                name: "연애",
                description: "건강한 연애를 위한 프로젝트",
                to: "/camps/love",
            },
            {
                name: "사진",
                description: "사진 프로젝트",
                to: "/camps/photo",
            },
            {
                name: "에세이",
                description: "에세이 캠프 프로젝트",
                to: "/camps/essay",
            }
        ]
    }
];

export function Navigation() {
    return (
        <nav className="flex px-2 sm:px-4 lg:px-20 h-12 sm:h-14 lg:h-16 items-center fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
            <div className="flex items-center">
                <Link to="/" className="font-bold text-sm sm:text-base lg:text-lg text-blue-600 hover:text-blue-800">
                    KOI
                </Link>
                <Separator orientation="vertical" className="h-6 mx-2 sm:mx-4" />
                <NavigationMenu>
                    <NavigationMenuList>
                        {menus.map((menu) => (
                            <NavigationMenuItem key={menu.name}>
                                {menu.items ? (
                                    <>
                                        <Link to={menu.to}>
                                            <NavigationMenuTrigger className="text-xs sm:text-sm font-medium h-8 sm:h-9 px-2 sm:px-3">
                                                {menu.name}
                                            </NavigationMenuTrigger>
                                        </Link>
                                        <NavigationMenuContent>
                                            <ul className="grid w-[400px] font-light gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                                {menu.items?.map((item) => (
                                                    <NavigationMenuItem
                                                        key={item.name}
                                                        className={cn([
                                                            "select-none rounded-md transition-colors focus:bg-accent hover:bg-accent"
                                                        ])}
                                                    >
                                                        <NavigationMenuLink asChild>
                                                            <Link 
                                                                className="p-3 space-y-1 block leading-none no-underline outline-none"
                                                                to={item.to}
                                                            >
                                                                <span className="text-sm font-medium leading-none">
                                                                    {item.name}
                                                                </span>
                                                                <p className="text-sm leading-snug text-muted-foreground">
                                                                    {item.description}
                                                                </p>
                                                            </Link>
                                                        </NavigationMenuLink>
                                                    </NavigationMenuItem>
                                                ))}
                                            </ul>
                                        </NavigationMenuContent>
                                    </>
                                ) : (
                                    <NavigationMenuLink asChild>
                                        <Link 
                                            to={menu.to}
                                            className="group inline-flex h-8 sm:h-9 w-max items-center justify-center rounded-md bg-background px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 whitespace-nowrap"
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