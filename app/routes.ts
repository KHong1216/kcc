import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

export default [
    index("common/pages/home-page.tsx"),
    ...prefix("about", [
        route("/representative", "features/about/pages/about-representative-page.tsx"),
        route("/counselors", "features/about/pages/about-counselors-page.tsx"),
    ]),
    ...prefix("camps", [
        route("/love", "features/love/pages/love-page.tsx"),
        route("/photo", "features/magazine/pages/magazine-page.tsx"),
        route("/essay", "features/bookstay/pages/bookstay-page.tsx"),
    ]),
    ...prefix("reservation", [
        index("features/reservation/pages/reservation-page.tsx")
    ]),
    ...prefix("community", [
        route("/notice","features/community/pages/notice-page.tsx"),
        route("/review","features/community/pages/review-page.tsx"),
        route("/free","features/community/pages/free-page.tsx")
    ])
    
] satisfies RouteConfig