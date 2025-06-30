const API_KEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;

export async function askGPT(prompt: string): Promise<string> {
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000"
      },
      body: JSON.stringify({
        model: "mistralai/mistral-small-3.2-24b-instruct:free",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`API request failed: ${res.status} ${res.statusText} - ${errorText}`);
    }

    const json = await res.json();
    
    // Check if the response has the expected structure
    if (!json.choices || !Array.isArray(json.choices) || json.choices.length === 0) {
      throw new Error("Invalid response structure: no choices found");
    }
    
    if (!json.choices[0] || !json.choices[0].message || !json.choices[0].message.content) {
      throw new Error("Invalid response structure: no message content found");
    }
    
    return json.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error in askGPT:", error);
    throw new Error(`Failed to get response from AI: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}