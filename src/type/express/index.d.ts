declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        name: string;
        email: string;
        emailVerified: boolean;
        image: string;
        phone: string;
        role: string;
        status: string;
      };
    }
  }
}

export {};
