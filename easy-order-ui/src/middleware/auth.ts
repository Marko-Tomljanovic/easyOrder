import { redirect } from "next/navigation";

export function checkLocalStorage(currentPathname: string) {
  const dataFromLocalStorage = localStorage.getItem("isCurrentUser");
  const allowedRoutes = ["/", "/register"];
  console.log(dataFromLocalStorage);

  if (!dataFromLocalStorage && !allowedRoutes.includes(currentPathname)) {
    return redirect("/");
  }
  if (dataFromLocalStorage && allowedRoutes.includes(currentPathname)) {
    return redirect("/dashboard");
  }
  return;
}
