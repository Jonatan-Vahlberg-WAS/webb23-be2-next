

type BaseProduct = {
    name: string;
    price: number;
}

type ElectronicProduct = BaseProduct & {
    voltage: number;
    category: "electronic";
}

type ProduceProduct = BaseProduct & {
    kcal: number
    category: "produce"
}

type Product = ElectronicProduct | ProduceProduct;