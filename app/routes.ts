import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

export default [
    index("common/pages/home-page.tsx"),
    ...prefix("about", [
        route("/representative", "features/about/pages/about-representative-page.tsx"),
        route("/counselors", "features/about/pages/about-counselors-page.tsx"),
    ]),
    ...prefix("camps", [
        route("/essay", "features/essay/pages/essay-page.tsx"),
        route("/love", "features/love/pages/love-page.tsx"),
        route("/photo", "features/photo/pages/photo-page.tsx"),
    ]),
    ...prefix("reservation", [
        index("features/reservation/pages/reservation-page.tsx"),
        route("/apply", "features/reservation/pages/reservation-apply-page.tsx")
    ]),
    ...prefix("community", [
        route("/notice", "features/community/pages/notice-page.tsx"),
        route("/review", "features/community/pages/review-page.tsx"),
        route("/free", "features/community/pages/free-page.tsx")
    ]),
    ...prefix("admin", [
        index("features/admin/pages/admin-page.tsx"),
        route("login", "features/admin/pages/admin-login-page.tsx"),
        route("managers", "features/admin/pages/managers-page.tsx"),
        route("programs", "features/admin/pages/admin-programs-page.tsx"),
        route("reservations", "features/admin/pages/admin-reservations-page.tsx"),
        route("community", "features/admin/pages/admin-community-page.tsx"),
    ]),
] satisfies RouteConfig