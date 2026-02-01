import { NextFunction, Request, Response } from "express";
import { auth } from "../lib/auth";

const authentication = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers as any,
      });

      if (!session) {
        res.status(401).json({
          success: false,
          message: "You are not authorized",
        });
      }

      //   if (!session?.user.emailVerified) {
      //     res.status(403).json({
      //       success: false,
      //       message: "Email verification required. Please verify your email",
      //     });
      //   }
      req.user = {
        id: session?.user.id as string,
        name: session?.user.name as string,
        email: session?.user.email as string,
        emailVerified: session?.user.emailVerified as boolean,
        image: session?.user.image as string,
        phone: session?.user.phone as string,
        role: session?.user.role as string,
        status: session?.user.status as string,
      };

      if (roles.length && !roles.includes(req.user.role)) {
        res.status(403).json({
          success: false,
          message: "Forbidden ! You don't have permission to access",
        });
      } else {
        next();
      }
    } catch (error) {
      next(error);
    }
  };
};

export default authentication;
