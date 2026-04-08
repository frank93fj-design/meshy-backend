export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: "Missing task ID" });
    }

    const response = await fetch(`https://api.meshy.ai/openapi/v1/image-to-3d/${id}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${process.env.MESHY_API_KEY}`
      }
    });

    const data = await response.json();
    return res.status(response.status).json(data);

  } catch (error) {
    return res.status(500).json({
      error: "Failed to fetch task status",
      details: error.message
    });
  }
}
