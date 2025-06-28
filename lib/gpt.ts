const API_KEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
export async function askGPT(prompt: string): Promise<string> {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ` + API_KEY, // Put securely using env if possible
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:3000" // Use your domain in production
    },
    body: JSON.stringify({
      model: "mistralai/mistral-small-3.2-24b-instruct:free",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) throw new Error("Failed to fetch response");

  const json = await res.json();
  return json.choices[0].message.content.trim();
}