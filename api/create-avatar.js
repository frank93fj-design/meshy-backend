export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: "Missing imageUrl" });
    }

    const response = await fetch("https://api.meshy.ai/openapi/v1/image-to-3d", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.MESHY_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        image_url: imageUrl
      })
    });

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({
      error: "Server error creating avatar",
      details: error.message
    });
  }
}
