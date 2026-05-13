import path from "path";
import fs from "fs";
import type { IProduct } from "../type/product.type";
import { writeFile } from "../utils/writeFile";

const filePath = path.join(process.cwd(), "/src/DB/db.json");

export const getAllProducts = async () => {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

export const createProduct = async (product: Partial<IProduct>) => {
  const allProducts: IProduct[] = await getAllProducts();

  const ids: number[] = [];

  for (const i of allProducts) {
    ids.push(i.id);
  }
  const maxId = ids.reduce((max, val) => {
    return max > val ? max : val;
  }, 0);

  const newId = maxId + 1;
  const newProduct = { id: newId, ...product } as IProduct;
  allProducts.push(newProduct);
  writeFile(filePath, allProducts);
  return newProduct;
};

export const updateProduct = async (payload: IProduct[]) => {
  writeFile(filePath, payload);
};

export const deleteSingleProduct = async (payload:IProduct[]) => {
  writeFile(filePath, payload);
};
