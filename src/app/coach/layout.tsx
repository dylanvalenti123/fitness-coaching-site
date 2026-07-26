import { DashboardShell } from "@/components/dashboard-shell";
import { requireCoach } from "@/lib/dal";

const navItems = [
  { href: "/coach/clients", label: "Clients" },
  { href: "/coach/programs", label: "Programs" },
  { href: "/coach/messages", label: "Messages" },
  { href: "/coach/sessions", label: "Sessions" },
];

export default async function CoachLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireCoach();
  return <DashboardShell navItems={navItems}>{children}</DashboardShell>;
}
