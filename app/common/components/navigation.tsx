import { Link, useLocation } from "react-router";
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
        name: "About",
        to: "/about/representative",
    },
    {
        name: "Manager",
        to: "/about/counselors",
    },
    {
        name: "Project",
        to: "/programs/essay",
        items: [
            {
                name: "에세이",
                description: "나의 한해를 기록하기",
                to: "/programs/essay",
            },
            {
                name: "연애경향성",
                description: "나의 연애를 알아보는 시간",
                to: "/programs/love",
            },
            {
                name: "사진",
                description: "사진 프로젝트",
                to: "/programs/photo",
            },
            
        ]
    },
    {
        name: "Reservation",
        to: "/reservation",
    },
    {
        name: "Community",
        to: "/community/notice",
        items: [
            {
                name: "공지사항",
                to: "/community/notice",
            },
            {
                name: "리뷰",
                to: "/community/review",
            },
            {
                name: "무료테스트",
                description: "에세이 캠프 프로젝트",
                to: "/community/free",
            }
        ]
    },
];

export function Navigation() {
    const location = useLocation();
    const isHomePage = location.pathname === "/";
    
    return (
        <nav className={cn(
            "flex px-1 sm:px-4 lg:px-20 h-12 sm:h-14 lg:h-16 items-center fixed top-0 left-0 right-0 z-50 transition-all duration-300",
            isHomePage 
                ? "bg-transparent backdrop-blur-sm" 
                : "bg-white border-b border-gray-200 shadow-sm"
        )}>
            <div className="flex items-center">
                <Link 
                    to="/" 
                    className={cn(
                        "font-bold text-sm sm:text-base lg:text-lg hover:text-blue-800 transition-colors",
                        isHomePage ? "text-white" : "text-blue-600"
                    )}
                >
                    KOI
                </Link>
                <Separator 
                    orientation="vertical" 
                    className={cn(
                        "h-6 mx-1 sm:mx-4", // 모바일에서 mx-2 → mx-1로 줄임
                        isHomePage ? "bg-white/30" : ""
                    )} 
                />
                <NavigationMenu>
                    <NavigationMenuList className="gap-0 sm:gap-1"> {/* 모바일에서 gap 제거 */}
                        {menus.map((menu) => (
                            <NavigationMenuItem key={menu.name}>
                                {menu.items ? (
                                    <>
                                        <Link to={menu.to}>
                                            <NavigationMenuTrigger className={cn(
                                                "text-xs sm:text-sm font-medium h-8 sm:h-9 px-1 sm:px-3 transition-colors bg-transparent hover:bg-transparent", // 모바일에서 px-2 → px-1로 줄임
                                                isHomePage 
                                                    ? "text-white hover:text-white/80" 
                                                    : "text-gray-900 hover:text-gray-900/80"
                                            )}>
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
                                            className={cn(
                                                "group inline-flex h-8 sm:h-9 w-max items-center justify-center rounded-md px-1 sm:px-3 py-1 text-xs sm:text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 whitespace-nowrap", // 모바일에서 px-2 → px-1로 줄임
                                                isHomePage 
                                                    ? "bg-transparent text-white hover:text-white/80 hover:bg-white/10" 
                                                    : "bg-background text-gray-900"
                                            )}
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