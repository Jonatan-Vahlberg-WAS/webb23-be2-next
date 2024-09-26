
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

    async getItemOnId(id: number): Promise<T> {
        const url = new URL(`${this.baseURL}/${id}/`)
        const response = await fetch(url)

        if(response.ok) {
            const data = await response.json();
            return data
        }
        throw new Error("Unable to get list")
    }

    async addItem(item: Omit<T,"id">) {
        //TODO implement POST for new T
    }
}

export default ApiKit