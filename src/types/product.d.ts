type BaseProduct = {
  name: string;
  price: number;
};

type ElectronicProduct = BaseProduct & {
  voltage: number;
  category: "electronic" | "electronic-tool";
};

type ProduceProduct = BaseProduct & {
  kcal: number;
  category: "produce";
};

type ToolProduct = BaseProduct & {
  category: "tool" | "electronic-tool";
  maker: string;
};

type ElectronicToolProduct = ElectronicProduct & ToolProduct & {
    category: "electronic-tool";
    batteryDriven?: boolean;
}

type Product = ElectronicProduct | ProduceProduct | ToolProduct | ElectronicToolProduct;
