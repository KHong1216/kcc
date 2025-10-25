import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

export default[
    index("common/pages/home-page.tsx"),
    ...prefix("about",[
        index("features/about/pages/about-ceo-page.tsx"),
        route("/managers", "features/about/pages/about-managers-page.tsx"),
    ]),
    ...prefix("love",[
        index("features/love/pages/love-page.tsx"),
    ]),
    ...prefix("magazine",[
        index("features/magazine/pages/magazine-page.tsx"),
    ]),
    ...prefix("bookstay",[
        index("features/bookstay/pages/bookstay-page.tsx"),
    ])
] satisfies RouteConfig