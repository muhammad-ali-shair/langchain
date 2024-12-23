import { JsonOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { HuggingFaceInference } from "@langchain/community/llms/hf";

// Define your desired data structure.
import { z } from "zod";

// Define the schema for ExtractedDetails using zod
const ExtractedDetailsSchema = z.object({
  summary: z.string().nullable().describe("A brief summary of the individual"),
  email: z.string().nullable().describe("Contact email"),
  name: z.string().nullable().describe("Full name")
});

// Initialize the structured LLM
const model = new HuggingFaceInference({
  apiKey: "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", // Replace with your actual API key
  model: "meta-llama/Meta-Llama-3-8B-Instruct",
  temperature: 0.8,
  maxTokens: 500,
});

const structuredLlm = model.withStructuredOutput!(ExtractedDetailsSchema);  // this comang causing issue (i think this method is not available in hugging face)

export async function main(inputParagraph: string) {
  // Define the input prompt
  const prompt = `
    Extract the details from the paragraph and respond with a JSON object containing the following keys:
    - summary, email, name, phone, address, skills, areaOfInterests, experience, education, projects, certificatesAndCourses.
    If any information is missing, set its value to null.
    Paragraph: {inputParagraph}
  `;

  try {
    // Invoke the structured LLM with the input paragraph
    const response = await structuredLlm.invoke(prompt.replace("{inputParagraph}", inputParagraph));

    // Log the structured response
    console.log("Extracted Details:", response);

    // Optional: Save to file
    // const fs = await import("fs/promises");
    // await fs.writeFile("./output.json", JSON.stringify(response, null, 2), "utf-8");
    console.log("JSON saved to output.json");
  } catch (error) {
    console.error("Error occurred:", error);
  }
}
