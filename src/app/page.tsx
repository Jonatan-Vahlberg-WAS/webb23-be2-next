import Assert from "@/components/Assert";
import Generics from "@/components/Generics";
import Generics2 from "@/components/Generics2";
import Generics3Server from "@/components/Generics2server";
import { NextPage } from "next";

export default function Home({searchParams}: any) {
  console.clear();
  console.log("Hello from the page component!");
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Assert/>
        {/* <Generics/> */}
        {/* <Generics2/> */}
        <Generics3Server
          search={searchParams.search}
        />
       </main>
    </div>
  );
}
