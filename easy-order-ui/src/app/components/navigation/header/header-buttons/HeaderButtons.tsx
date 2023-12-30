import HeaderBaza from "@/app/components/header-components/admin/HeaderBaza";
import HeaderRaspored from "@/app/components/header-components/admin/HeaderRaspored";
import AdminProvider from "@/context/AdminProvider";

export default function HeaderButtons({ currentTitle }: { currentTitle: any }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        marginRight: "25px",
      }}
    >
      <AdminProvider>
        {currentTitle === "Baza proizvoda" ? <HeaderBaza /> : null}
        {currentTitle === "Raspored" ? <HeaderRaspored /> : null}
      </AdminProvider>
    </div>
  );
}
