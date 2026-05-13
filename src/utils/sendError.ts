import type { ServerResponse } from "http";

export const sendError = (
  res: ServerResponse,
  { statuCode, message, data }: { statuCode: number; message: any; data: any },
) => {
  res.writeHead(statuCode, { "content-type": "application/json" });
  res.end(
    JSON.stringify({
      success: false,
      messgae: message || "Something went wrong",
      data: data,
    }),
  );
};
