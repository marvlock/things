import { DocsSidebar } from "@/app/components/docs-sidebar";
import { Navbar } from "@/app/components/navbar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1 relative">
        <DocsSidebar />
        <main className="flex-1 overflow-y-auto lg:ml-0">{children}</main>
      </div>
    </div>
  );
}
