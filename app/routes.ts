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
        route("contact", "features/admin/contact/pages/admin-contact-page.tsx"),
        route("test", "features/admin/common/test/pages/admin-test-page.tsx"),
    ]),
    ...prefix("community", [
        route("notice", "features/community/pages/notice-page.tsx"),
        route("review", "features/community/pages/review-page.tsx"),
        route("free", "features/community/pages/free-page.tsx"),
        route("contact", "features/community/pages/contact-page.tsx")
    ]),
    ...prefix("programs", [
        route("essay", "features/programs/essay/pages/essay-page.tsx"),
        route("love", "features/event/pages/love-potion-event-page2.tsx"),
        route("photo", "features/programs/photo/pages/photo-page.tsx"),
    ]),
    ...prefix("reservation", [
        index("features/reservation/pages/reservation-chat-page.tsx"),
        route("apply", "features/reservation/pages/reservation-apply-page.tsx")
    ]),
    ...prefix("test", [
        index("features/test/pages/test-page.tsx"),
        route("gift", "features/test/pages/gift-page.tsx"),
        route("emotion", "features/test/pages/emotion-page.tsx"),
        route("event-result", "features/test/pages/event-result-page.tsx"),
    ]),
    route("join", "features/reservation/pages/qr-page.tsx"),
    route("/api/chat", "features/reservation/api-chat.tsx"),
    route("/api/admin/report", "features/admin/common/api-admin-report.tsx"),
    route("/easteregg", "features/programs/easteregg/pages/easter-egg-page.tsx"),
] satisfies RouteConfig