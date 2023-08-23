import { Request, Response, NextFunction, RequestHandler } from "express";
import JWT from "jsonwebtoken";

type CustomRequest = Request & { user: any } & any;

export const authenticationMiddleware = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeaders = req.headers.authorization;

  let token = "";

  if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
    return res.status(400).json({ message: "Invalid authorizatio" });
  }

  token = authHeaders.split(" ")[1];

  try {
    const decode: any = JWT.verify(token, process.env.JWT_SECRET as string);
    const { id } = decode;
    req.user = { id };
    next();
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
