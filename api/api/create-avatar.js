export default async function handler(req, res) {
  const { imageUrl } = req.body;

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
  res.status(200).json(data);
}
