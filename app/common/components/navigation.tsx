import { Link, useLocation } from "react-router";
import { Separator } from "./ui/separator";
import { cn } from "~/lib/utils";
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
                description: "자기 이해를 통한 나의 이야기 발견",
                to: "/programs/essay",
            },
            {
                name: "연애경향성",
                description: "내가 바뀌면 관계 전체가 달라진다",
                to: "/programs/love",
            },
            {
                name: "사진",
                description: "외적·내적 균형을 갖춘 아름다움",
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
            },
            {
                name: "Contact",
                description: "문의하기",
                to: "/community/contact",
            }
        ]
    },
];

export function Navigation() {
    const location = useLocation();
    const isHomePage = location.pathname === "/";
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // 홈페이지에 이미 있는 경우 클릭 방지 (깜빡임 방지)
        if (isHomePage) {
            e.preventDefault();
            // 스크롤을 맨 위로 이동 (선택사항)
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };
    
    return (
        <>
            <nav className={cn(
                "flex justify-between items-center px-3 sm:px-6 lg:px-8 h-14 sm:h-16 lg:h-18 fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isHomePage 
                    ? "bg-white/70 backdrop-blur-md shadow-sm" 
                    : "bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm"
            )}>
                {/* 로고 및 메뉴 영역 */}
                <div className="flex items-center flex-1 min-w-0">
                    <Link 
                        to="/" 
                        onClick={handleHomeClick}
                        className={cn(
                            "text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight transition-colors flex-shrink-0",
                            isHomePage ? "" : ""
                        )}
                    >
                        <span className="bg-clip-text text-transparent bg-[linear-gradient(90deg,#A8C5F8,#F3C3E6,#FFE6C5)]">
                            KOI
                        </span>
                        <span className="text-[#7B6E6E] font-medium ml-1 hidden sm:inline">Creative Lab</span>
                    </Link>
                    <Separator 
                        orientation="vertical" 
                        className={cn(
                            "h-6 mx-2 sm:mx-4 hidden md:block",
                            isHomePage ? "bg-white/30" : ""
                        )} 
                    />

                    {/* 데스크톱 메뉴 */}
                    <div className="hidden md:flex items-center">
                    <NavigationMenu>
                        <NavigationMenuList className="gap-0 sm:gap-1">
                            {menus.map((menu) => (
                                <NavigationMenuItem key={menu.name}>
                                    {menu.items ? (
                                        <>
                                            <Link to={menu.to}>
                                                <NavigationMenuTrigger className={cn(
                                                    "text-sm font-medium h-9 px-3 transition-colors bg-transparent hover:bg-transparent rounded-lg",
                                                    isHomePage 
                                                        ? "text-gray-700 hover:text-[#2D6A9F] hover:bg-[#E8F4FB]" 
                                                        : "text-gray-600 hover:text-[#2D6A9F] hover:bg-[#E8F4FB]"
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
                                                    "group inline-flex h-9 w-max items-center justify-center rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap",
                                                    isHomePage 
                                                        ? "bg-transparent text-gray-700 hover:text-[#2D6A9F] hover:bg-[#E8F4FB]" 
                                                        : "bg-transparent text-gray-600 hover:text-[#2D6A9F] hover:bg-[#E8F4FB]"
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
                </div>

                {/* 모바일 햄버거 메뉴 버튼 */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className={cn(
                        "md:hidden p-2 rounded-lg transition-colors",
                        isHomePage 
                            ? "text-gray-700 hover:bg-[#E8F4FB]" 
                            : "text-gray-600 hover:bg-[#E8F4FB]"
                    )}
                    aria-label="메뉴 열기"
                >
                    {mobileMenuOpen ? (
                        <X className="w-6 h-6" />
                    ) : (
                        <Menu className="w-6 h-6" />
                    )}
                </button>
            </nav>

            {/* 모바일 메뉴 */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 top-14 md:hidden z-40 bg-white/95 backdrop-blur-md">
                    <div className="px-4 py-6 space-y-4 overflow-y-auto h-full">
                        {menus.map((menu) => (
                            <div key={menu.name} className="space-y-2">
                                {menu.items ? (
                                    <>
                                        <Link
                                            to={menu.to}
                                            onClick={closeMobileMenu}
                                            className={cn(
                                                "block py-2 text-base font-semibold",
                                                isHomePage 
                                                    ? "text-gray-700" 
                                                    : "text-gray-600"
                                            )}
                                        >
                                            {menu.name}
                                        </Link>
                                        <div className="pl-4 space-y-2 border-l-2 border-gray-200">
                                            {menu.items.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    to={item.to}
                                                    onClick={closeMobileMenu}
                                                    className="block py-2"
                                                >
                                                    <span className="text-sm font-medium text-gray-700 block">
                                                        {item.name}
                                                    </span>
                                                    {item.description && (
                                                        <span className="text-xs text-gray-500 mt-1 block">
                                                            {item.description}
                                                        </span>
                                                    )}
                                                </Link>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <Link
                                        to={menu.to}
                                        onClick={closeMobileMenu}
                                        className={cn(
                                            "block py-2 text-base font-semibold",
                                            isHomePage 
                                                ? "text-gray-700" 
                                                : "text-gray-600"
                                        )}
                                    >
                                        {menu.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}