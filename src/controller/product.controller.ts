import type { IncomingMessage, ServerResponse } from "http";

export const productController = (req: IncomingMessage,res: ServerResponse)=>{
    res.end(
      JSON.stringify({
        success: true,
        messgae: "This is product route",
      }),
    );

}