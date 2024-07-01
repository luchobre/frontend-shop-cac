import Footer from "@/components/Ui/footer/Footer";
import Sidebar from "@/components/Ui/sidebar/Sidebar";
import TopMenu from "@/components/Ui/top-menu/TopMenu";

export default function ShopLayout({children}:{
    children: React.ReactNode;
  }) {
    return (
      <main className="min-h-screen">
        <TopMenu />
        <Sidebar />
        <div className="px-1 sm:px-10">
        {children}
        </div>
        <Footer />
      </main>
    );
  }
  