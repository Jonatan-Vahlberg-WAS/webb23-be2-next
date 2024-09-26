
type Params = {
    q?: string
    [key: string]: any
}

class ApiKit<T> {
    baseURL: string;
    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    async getList(params?: Params): Promise<T[]> {
        const searchParams = new URLSearchParams(params)
        const url = new URL(`${this.baseURL}?${searchParams.toString()}`)
        
        const response = await fetch(url)

        if(response.ok) {
            const data = await response.json();
            return data
        }
        throw new Error("Unable to get list")
    }

    async getItemOnId(id: number) {
        //TODO: implemnet GET for spesific item
    }

    async addItem(item: Omit<T,"id">) {
        //TODO implement POST for new item
    }
}

export default ApiKit