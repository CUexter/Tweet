import HeaderSearch from "./header/Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <HeaderSearch />
      {children}
    </>
  );
};
export default Layout;
