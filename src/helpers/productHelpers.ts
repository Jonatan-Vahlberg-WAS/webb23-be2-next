export function isElectronic(product: Product): product is ElectronicProduct {
  return (product as ElectronicProduct).voltage !== undefined;
}

export function isProduce(product: Product): product is ProduceProduct {
  return (product as ProduceProduct).kcal !== undefined;
}

export function isTool(product: Product): product is ToolProduct {
  return (product as ToolProduct).maker !== undefined;
}

export function isElectronicTool(
  product: Product
): product is ElectronicToolProduct {
  return isElectronic(product) && isTool(product);
}
