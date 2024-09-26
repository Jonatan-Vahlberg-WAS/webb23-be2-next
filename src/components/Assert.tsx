import { getSomeData } from "@/actions/api";
import ProductCard from "./ProductCard";


async function Assert() {
  console.clear();
  console.log("Type assertions");
  const data = await getSomeData();
  console.log("Data from response", (data as Book).author);

  const products: Product[] = [
    {
      name: "Phone",
      price: 10000,
      category: "electronic",
      voltage: 220,
    },
    {
      name: "Tomato",
      price: 10,
      category: "produce",
      kcal: 50,
    },
    {
      name: "Wood cutting axe",
      price: 10000,
      category: "tool",
      maker: "Fiskars",
    },
    {
      name: "Chainsaw",
      price: 10000,
      category: "electronic-tool",
      maker: "Fiskars",
      voltage: 220,
      batteryDriven: false,
    },
  ];

  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product.name} product={product} />
      ))}
    </div>
  );
}

export default Assert;
