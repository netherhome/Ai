export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { prompt } = await req.json();

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
      {
        method: "POST",
        headers: {
          "Authorization": "Bearer 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", // replace with your token
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ inputs: prompt })
      }
    );

    const data = await response.json();
    
    let reply = "No response";
    // BlenderBot returns generated_text directly or in an array with key generated_text
    if (Array.isArray(data) && data[0]?.generated_text) reply = data[0].generated_text;
    else if (data.generated_text) reply = data.generated_text;
    else if (data?.error) reply = "AI ERROR: " + data.error;

    res.status(200).json({ reply });
  } catch (err) {
    res.status(500).json({ reply: "AI ERROR: " + err.message });
  }
}
