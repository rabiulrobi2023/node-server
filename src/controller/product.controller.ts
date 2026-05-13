import { get, type IncomingMessage, type ServerResponse } from "http";
import {
  createProduct,
  deleteSingleProduct,
  getAllProducts,
  updateProduct,
} from "../service/product.service";
import type { IProduct } from "../type/product.type";
import { parseBody } from "../utils/parseBody";
import { sendResponse } from "../utils/sendResponse";
import { sendError } from "../utils/sendError";

export const productController = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;

  const urlParts = url?.split("/");
  const id = urlParts ? urlParts[2] : null;

  if (url === "/products" && method === "GET" && id == null) {
    try {
      const result: IProduct[] = await getAllProducts();
      if (result.length === 0) {
        return sendError(res, {
          statuCode: 404,
          message: "Product not found",
          data: {},
        });
      }
      sendResponse(res, {
        message: "Data retrived successfully",
        data: result,
      });
    } catch (error) {
      return sendError(res, { statuCode: 400, message: error, data: null });
    }
  } else if (method === "GET" && id != null) {
    try {
      if (Number(id) < 1) {
        return sendError(res, {
          statuCode: 404,
          message: "Invalid Product Id",
          data: {},
        });
      }
      const allProducts: IProduct[] = await getAllProducts();

      const result = allProducts.find((p: IProduct) => p.id === Number(id));
      if (!result) {
        return sendResponse(res, { message: "Product not found", data: {} });
      }
      sendResponse(res, {
        message: "Product retrived successfully",
        data: result,
      });
    } catch (err) {
      return sendError(res, { statuCode: 400, message: err, data: {} });
    }
  } else if (method === "POST") {
    const body = await parseBody(req);

    const result = await createProduct(body);
    console.log(result);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        success: true,
        messgae: "Product created succefully",
        data: result,
      }),
    );
  } else if (method === "PUT" && id != null) {
    const body = await parseBody(req);
    const allProducts: IProduct[] = await getAllProducts();
    const updateProductIndex = allProducts.findIndex(
      (product) => product.id === Number(id),
    );

    if (updateProductIndex < 1) {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          success: false,
          messgae: "Product not found",
          data: {},
        }),
      );
    }
    const updatedProduct = (allProducts[updateProductIndex] = {
      id: Number(id),
      ...body,
    } as IProduct);

    await updateProduct(allProducts);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        success: true,
        messgae: "Product updated succefully",
        data: updatedProduct,
      }),
    );
  } else if (method === "DELETE" && id != null) {
    const allProducts: IProduct[] = await getAllProducts();
    const deleteProductIndex = allProducts.findIndex(
      (product) => product.id === Number(id),
    );

    if (deleteProductIndex < 1) {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          success: false,
          messgae: "Product not found",
          data: {},
        }),
      );
    }
    allProducts.splice(deleteProductIndex, 1);
    deleteSingleProduct(allProducts);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        success: true,
        messgae: "Product delete succefully",
        data: null,
      }),
    );
  }
};
