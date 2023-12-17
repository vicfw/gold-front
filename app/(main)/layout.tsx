import { Toaster } from "@/components/ui/toaster";
import LayoutComponent from "./Layout.component";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full">
      <>
        <LayoutComponent>{children}</LayoutComponent>
        <Toaster />
      </>
    </div>
  );
}
