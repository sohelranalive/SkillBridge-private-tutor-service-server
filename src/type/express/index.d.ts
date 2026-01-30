declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        name: string;
        email: string;
        emailVerified: boolean;
        image: String;
        phone: String;
        role: string;
        status: String;
      };
    }
  }
}

export {};
