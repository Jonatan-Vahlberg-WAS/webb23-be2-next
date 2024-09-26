

export async function getSomeData(): Promise<any> {
    //Simulates a DB call
    const data = {
        author: "Author Name",
        title: "Book Title",
        id: 1
    }

    return Promise.resolve(data)
}