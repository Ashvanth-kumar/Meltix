// const SYSTEM_PROMPT = `
// You are an assistant that recieves a list of ingredients that a user has and suggests a recipe that you could make with some or all of those ingredients.
// you don't need to use every ingredients they have metion in your recipe . 
// The recipe can include additional ingredients they didn't mention , but try not to include too many extra ingredients.
// Format your response in markdown to make it easier to render to a web page
// `
// const hfKey = process.env.HF_ACCESS_TOKEN

// export default async function getRecipeFromMistral(ingredientsArr) {
//     const ingredientsString = ingredientsArr.join(", ")
//     try{
//         const response = await hfKey.chatCompletion({
//             model:"mistralai/Mistral-7B-Instruct-v0.3",
//             message:[
//                 {role:"system", content : SYSTEM_PROMPT} , 
//                 {role:"user" , content : `I have ${ingredientsString}. Please give me a recipe you'd recommend I make! `},
//             ],
//             max_tokens: 1024,
//         })
//         return response.choices[0].message.content
//     }catch(err){
//         console.error(err.message)
//     }
// }
// const HF_API_KEY = process.env.HF_ACCESS_TOKEN;

// export default async function getRecipeFromMistral(ingredientsArr) {
//   const ingredientsString = ingredientsArr.join(", ");

//   const prompt = `
//     You are an assistant that receives a list of ingredients and suggests a recipe the user can make.
//     You don't have to use all the ingredients.
//     You can add a few common ones if needed.
//     Respond in plain text or markdown.
//     I have: ${ingredientsString}.
//     What recipe do you suggest?`;

//   try {
//     const response = await fetch(
//       'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3',
//       {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${HF_API_KEY}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           inputs: prompt,
//           parameters: {
//             max_new_tokens: 1024,
//           },
//         }),
//       }
//     );

//     const data = await response.json();

//     if (data.error) {
//       throw new Error(data.error);
//     }

//     return data.generated_text || data[0]?.generated_text || 'No response received.';
//   } catch (err) {
//     console.error('API error:', err);
//     return 'Something went wrong while fetching the recipe.';
//   }
// }

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
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 500,
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
