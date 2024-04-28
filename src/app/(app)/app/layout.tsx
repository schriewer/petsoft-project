import AppFooter from "@/components/app-footer";
import AppHeader from "@/components/app-header";
import BackgroundPattern from "@/components/background-pattern";
import PetContextProvider from "../../../contexts/pet-context-provider";
import { Pet } from "@/lib/type";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const response = await fetch(
    "https://bytegrad.com/course-assets/projects/petsoft/api/pets"
  );
  if (!response.ok) {
    throw new Error("Could not fetch pets");
  }
  const data: Pet[] = await response.json();

  return (
    <>
      <BackgroundPattern />
      <div className="flex flex-col min-h-screen max-w-[1050px] px-4 mx-auto">
        <AppHeader />
        <PetContextProvider data={data}>{children}</PetContextProvider>
        <AppFooter />
      </div>
    </>
  );
}
