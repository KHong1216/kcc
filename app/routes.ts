import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

export default [
    index("common/pages/home-page.tsx"),
    ...prefix("about", [
        route("/representative", "features/about/pages/about-representative-page.tsx"),
        route("/counselors", "features/about/pages/about-counselors-page.tsx"),
    ]),
    ...prefix("admin", [
        index("features/admin/common/pages/admin-page.tsx"),
        route("login", "features/admin/common/pages/admin-login-page.tsx"),
        route("community", "features/admin/community/pages/admin-community-page.tsx"),
        route("managers", "features/admin/manager/pages/admin-managers-page.tsx"),
        route("programs", "features/admin/programs/pages/admin-programs-page.tsx"),
        route("reservations", "features/admin/reservation/pages/admin-reservations-page.tsx"),
    ]),
    ...prefix("community", [
        route("notice", "features/community/pages/notice-page.tsx"),
        route("review", "features/community/pages/review-page.tsx"),
        route("free", "features/community/pages/free-page.tsx")
    ]),
    ...prefix("programs", [
        route("essay", "features/programs/essay/pages/essay-page.tsx"),
        route("love", "features/programs/love/pages/love-page.tsx"),
        route("photo", "features/programs/photo/pages/photo-page.tsx"),
    ]),
    ...prefix("reservation", [
        index("features/reservation/pages/reservation-page.tsx"),
        route("apply", "features/reservation/pages/reservation-apply-page.tsx")
    ]),
    route("join", "features/reservation/pages/qr-page.tsx"),
    
    
] satisfies RouteConfig