import { getSomeData } from "@/actions/api";

function isElectronic(product: Product): product is ElectronicProduct {
  return (product as ElectronicProduct).voltage !== undefined;
}

function isProduce(product: Product): product is ProduceProduct {
  return (product as ProduceProduct).kcal !== undefined;
}

function isTool(product: Product): product is ToolProduct {
  return (product as ToolProduct).maker !== undefined;
}

function isElectronicTool(
  product: Product
): product is ElectronicToolProduct {
  return isElectronic(product) && isTool(product);
}

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
        <div key={product.name} className="mb-2 bg-slate-200 p-4">
          <p>
            {isTool(product) && `${product.maker} - `}
            {product.name} - {product.price}
          </p>
          <p>
            <em>{product.category}</em>
          </p>
          {isElectronic(product) && (
            <div>
              <p>
                <strong>Voltage:&nbsp;</strong>
                {product.voltage}
              </p>
            </div>
          )}
          {isElectronicTool(product) && (
            <p>
              <strong>
                Is battery driven:&nbsp;
              </strong>
              {product.batteryDriven ? "Yes" : "No"}
            </p>
          )}
          {isProduce(product) && (
            <div>
              <p>
                <strong>kCal:&nbsp;</strong>
                {product.kcal}
              </p>
            </div>
          )}

          {/* //TODO render data about tools */}
        </div>
      ))}
    </div>
  );
}

export default Assert;
