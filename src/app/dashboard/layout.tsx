import { DashboardShell } from "@/components/dashboard-shell";

const navItems = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/programs", label: "My Program" },
  { href: "/dashboard/progress", label: "Progress" },
  { href: "/dashboard/calorie-tracker", label: "Calorie Tracker" },
  { href: "/dashboard/messages", label: "Messages" },
  { href: "/dashboard/sessions", label: "Sessions" },
  { href: "/dashboard/billing", label: "Billing" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell navItems={navItems}>{children}</DashboardShell>;
}
