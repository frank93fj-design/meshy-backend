export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Missing task ID" });
  }

  try {
    const response = await fetch(
      `https://api.meshy.ai/openapi/v1/image-to-3d/${id}`,
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${process.env.MESHY_API_KEY}`
        }
      }
    );

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({
      error: "Failed to fetch task status",
      details: error.message
    });
  }
}
