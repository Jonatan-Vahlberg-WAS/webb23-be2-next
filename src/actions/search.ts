"use server";

import { revalidatePath } from "next/cache";

export async function searchAction(formData: FormData) {
      const search = formData.get("search") as string
      console.log("search", search) 
      revalidatePath(`/generics3-server?search=${search}`)
      // return to url with search query

      return Promise.resolve()  
}
    