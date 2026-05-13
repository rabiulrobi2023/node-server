import type { ServerResponse } from "http";

export const sendResponse = (
  res: ServerResponse,
  { message, data }: { message: string; data: any },
) => {
  res.writeHead(200, { "content-type": "application/json" });
  res.end(
    JSON.stringify({
      success: true,
      messgae: message,
      data: data,
    }),
  );
};
