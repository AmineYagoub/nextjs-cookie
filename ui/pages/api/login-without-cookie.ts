import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const data = await fetch(
      "http://backend:3000/backend/login-without-cookie",
      {
        method: "POST",
      }
    ).then((response) => {
      const accessToken = "something";
      res.setHeader(
        "Set-Cookie",
        serialize("clientToken", accessToken, {
          expires: new Date(new Date().getTime() + 30 * 1000),
          sameSite: "strict",
          httpOnly: true,
          path: "/",
        })
      );
      return response.json();
    });
    res.status(200).json(data);
  }
}
