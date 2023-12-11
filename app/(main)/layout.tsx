import LayoutComponent from "./Layout.component";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <LayoutComponent>{children}</LayoutComponent>
    </div>
  );
}
 