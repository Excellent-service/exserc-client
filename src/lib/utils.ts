import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const links = [
    {
        name: "Home",
        path: '/'
    },
    {
        name: "About",
        path: "#"
    },
    {
        name: "Service List",
        path: '#'
    },
    {
        name: "Blog",
        path: "#"
    },
    {
        name: "Contact",
        path: "#"
    }
]
export const Dashboardlinks = [
    {
        name: "Home",
        path: '/user/home',
        icon: "dashboard.png"
    },
    {
        name: "Find service",
        path: '/find-service-providers',
        icon: "search.png"
    },
    {
        name: "Profile",
        path: '/user/profile/1',
        icon: "profile.png"
    },
    {
        name: "Fund wallet",
        path: "/user/wallet",
        icon: "fund_wallet.png"
    },
    {
        name: "My Jobs",
        path: '/user/jobs',
        icon: "my_jobs.png"
    },
    {
        name: "subscription",
        path: "/user/subscription",
        icon: "cards_receipts.png"
    },
    {
        name: "Transactions",
        path: "/user/transaction",
        icon: "transactions.png"
    },
    {
        name: "Notifications",
        path: "/user/notification",
        icon: "notifications.png"
    },
    {
        name: "Settings",
        path: "/user/settings",
        icon: "settings.png"
    }
]