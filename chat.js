export default async function handler(req, res) {
  const body = await req.json();
  const prompt = body.prompt || "";

  const response = await fetch("https://api-inference.huggingface.co/models/gpt2", {
    method: "POST",
    headers: {
      "Authorization": "Bearer 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",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ inputs: prompt })
  });

  const data = await response.json();
  const text = (data?.[0]?.generated_text || JSON.stringify(data));
  res.status(200).json({ reply: text });
}
