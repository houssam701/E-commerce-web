import { NextResponse } from "next/server";
export async function middleware(request) {
    const cookieName = "auth_session";
    const sessionCookie = request.cookies.get(cookieName);
    const url = new URL(request.url);

    if ( url.pathname === "/addItems" && !sessionCookie) {
        return NextResponse.redirect(new URL("/login", request.url)); 
    }
    if ( url.pathname === "/viewItems" && !sessionCookie) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    if ( url.pathname === "/viewOrders" && !sessionCookie) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    if ( url.pathname === "/viewMessages" && !sessionCookie) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    if ( url.pathname === "/login" && sessionCookie) {
        return NextResponse.redirect(new URL("/viewOrders", request.url));
    }
    return NextResponse.next();
}
// Apply middleware to relevant routes
export const config = {
    matcher: ["/addItems","/viewItems","/viewOrders","/viewMessages"], 
};
