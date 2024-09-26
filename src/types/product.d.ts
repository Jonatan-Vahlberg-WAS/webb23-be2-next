type BaseProduct = {
  name: string;
  price: number;
};

type ElectronicProduct = BaseProduct & {
  voltage: number;
  category: "electronic";
};

type ProduceProduct = BaseProduct & {
  kcal: number;
  category: "produce";
};

type ToolProduct = BaseProduct & {
  category: "tool";
  maker: string;
};

type ElectronicToolProduct = Omit<ElectronicProduct,"category"> & Omit<ToolProduct, "category"> & {
    category: "electronic-tool";
    batteryDriven?: boolean;
}

type Product = ElectronicProduct | ProduceProduct | ToolProduct | ElectronicToolProduct;
