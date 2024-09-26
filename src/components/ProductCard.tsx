import {
  isTool,
  isElectronic,
  isElectronicTool,
  isProduce,
} from "@/app/helpers/productHelpers";

type ProductCardProps = {
  product: Product;
};

function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="mb-4 p-4 bg-slate-100 rounded-lg shadow-md">
      <p className="text-lg font-semibold text-slate-800">
        {isTool(product) && `${product.maker} - `}
        {product.name} -{" "}
        <span className="text-green-600">${product.price}</span>
      </p>

      <p className="text-sm text-slate-500 italic">{product.category}</p>

      {isElectronic(product) && (
        <div className="mt-2">
          <p className="text-sm text-slate-700">
            <strong className="text-slate-800">Voltage:&nbsp;</strong>
            {product.voltage}
          </p>
        </div>
      )}

      {isElectronicTool(product) && (
        <p className="mt-2 text-sm text-slate-700">
          <strong className="text-slate-800">Is battery driven:&nbsp;</strong>
          {product.batteryDriven ? "Yes" : "No"}
        </p>
      )}

      {isProduce(product) && (
        <div className="mt-2">
          <p className="text-sm text-slate-700">
            <strong className="text-slate-800">kCal:&nbsp;</strong>
            {product.kcal}
          </p>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
