export default async function handler(req, res) {
  const HF_API_KEY = process.env.HF_ACCESS_TOKEN;

  if (req.method !== "POST") {
    return res.status(405).send("Method not allowed");
  }

  const ingredientsArr = req.body.ingredients || [];
  const ingredientsString = ingredientsArr.join(", ");

  const prompt = `
You are an assistant that receives a list of ingredients and suggests a recipe the user can make.
You don't have to use all the ingredients.
You can add a few common ones if needed.
Respond in plain text or markdown.

I have: ${ingredientsString}.
What recipe do you suggest?
`;

  try {
    const response = await fetch(
      "https://huggingface.co/mistralai/Mistral-Small-3.1-24B-Base-2503",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 1024,
            return_full_text: false,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("HF API error:", errorText);
      return res.status(response.status).send(errorText);
    }

    const data = await response.json();

    const recipeText = Array.isArray(data) 
      ? data[0]?.generated_text || "No recipe generated." 
      : data.generated_text || "No recipe generated.";

    res.status(200).send(recipeText);

  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal server error");
  }
}
