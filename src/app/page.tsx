

export default async function Home({searchParams}: any) {
  const data = await fetch("http://localhost:3000/api/hello")
    .then(response => response.json())
    .catch((error) => console.log("Error fetching hello", error))
    console.log(data)
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {JSON.stringify(data,null, 2)}
       </main>
    </div>
  );
}
