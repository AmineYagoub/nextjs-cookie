import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const data = await fetch("http://backend:3000/backend/login-with-cookie", {
      method: "POST",
    }).then((response) => {
      const rawCookies = response.headers.get("set-cookie") as string;
      res.setHeader("Set-Cookie", rawCookies);
      return response.json();
    });
    res.status(200).json(data);
  }
}
