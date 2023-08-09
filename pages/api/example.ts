// api/example.js
export default function handler(req: any, res: any) {
  if (req.method === "GET") {
    res.status(200).json({ message: "This is an example API endpoint." });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
