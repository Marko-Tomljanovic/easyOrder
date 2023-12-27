import HeaderBaza from "@/app/components/header-components/HeaderBaza";
import HeaderRaspored from "@/app/components/header-components/HeaderRaspored";

export default function HeaderButtons({ currentTitle }: { currentTitle: any }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        marginRight: "25px",
      }}
    >
      {currentTitle === "Baza artikala" ? <HeaderBaza /> : null}
      {currentTitle === "Raspored" ? <HeaderRaspored /> : null}
    </div>
  );
}
