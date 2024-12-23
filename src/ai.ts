import { JsonOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { HuggingFaceInference } from "@langchain/community/llms/hf";
import { ChatOllama } from "@langchain/ollama";


// Define your desired data structure.
// interface ExtractedDetails {
//   academicBackground: Array<{ degree: string; university: string; field: string }>;
//   professionalExperience: Array<{ years: number; roles: string[] }>;
//   projects: Array<{ name: string; technologies: string[] }>;
//   courses: Array<{ name: string; platform: string }>;
//   skills: string[];
//   technologies: string[];
// }

interface ExtractedDetails {
  summary: string | null;
  email: string | null;
  name: string | null;
  phone: string | null;
  address: string | null;
  skills: string[] | null;
  areaOfInterests: string[] | null;
  experience: Array<{
    companyName: string | null;
    location: string | null;
    date: string | null;
  }> | null;
  education: Array<{
    degree: string;
    university: string;
    field: string;
  }>;
  professionalExperience: Array<{
    years: number;
    roles: string[];
  }>;
  projects: Array<{
    name: string;
    technologies: string[];
  }>;
  courses: Array<{
    name: string;
    platform: string;
  }>;
  certificatesAndCourses: Array<{
    title: string | null;
    institute: string | null;
    date: string | null;
  }> | null;
  technologies: string[];
}


export async function main(inputParagraph:string) {
// Input paragraph

// Format instructions
// const formatInstructions = `
// Respond with a valid JSON object, containing the following fields:
// - academicBackground: an array of objects with keys 'degree', 'university', and 'field'.
// - professionalExperience: an array of objects with keys 'years' and 'roles' (an array of strings).
// - projects: an array of objects with keys 'name' and 'technologies' (an array of strings).
// - courses: an array of objects with keys 'name' and 'platform'.
// - skills: an array of strings.
// - technologies: an array of strings.
// `;


const formatInstructions = 
`Respond with a valid JSON object containing the following fields:
- summary: a string or null, summarizing the profile.
- email: a string or null, representing the email address.
- name: a string or null, representing the full name.
- phone: a string or null, representing the phone number.
- address: a string or null, representing the address.
- skills: an array of strings or null, listing the skills.
- areaOfInterests: an array of strings or null, listing the areas of interest.
- experience: an array of objects or null, where each object contains:
  - companyName: a string or null, representing the company name.
  - location: a string or null, representing the company's location.
  - date: a string or null, representing the employment dates.
- education: an array of objects or null, where each object contains:
  - title: a string or null, representing the degree or program.
  - institute: a string or null, representing the institute's name.
  - date: a string or null, representing the graduation date.
- projects: an array of objects or null, where each object contains:
  - name: a string or null, representing the project's name.
  - technologies: an array of strings or null, listing the technologies used.
- certificatesAndCourses: an array of objects or null, where each object contains:
  - title: a string or null, representing the certificate or course name.
  - institute: a string or null, representing the issuing institute.
  - date: a string or null, representing the completion date.
`;


// Set up a Hugging Face model
// const hfModel = new HuggingFaceInference({
//   apiKey: "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",
//   model: "meta-llama/Meta-Llama-3-8B-Instruct",
//   temperature: 0.7,
//   maxTokens: 500,
// });



const ollamaLlm = new ChatOllama({
  baseUrl: "http://69.57.160.76:11434", // Default value
  model: "llama2", // Default value
});
// const ollamaLlm = new ChatOllama({
//   baseUrl: "http://localhost:11434", // Default value
//   model: "llama3.2:1b", // Default value
// });

// Set up a parser + inject instructions into the prompt template
const parser = new JsonOutputParser<ExtractedDetails>();

const prompt = ChatPromptTemplate.fromTemplate(
  "Extract the details from the paragraph.\n{format_instructions}\nParagraph: {paragraph}\n"
);

const partialedPrompt = await prompt.partial({
  format_instructions: formatInstructions,
});

// const chain = partialedPrompt.pipe(hfModel);
const chain = partialedPrompt.pipe(ollamaLlm).pipe(parser);


  try {
    // Invoke the chain
    const response = await chain.invoke({ paragraph: inputParagraph });
    console.log("Extracted Details in JSON Format:", response);

    // Save to file (optional)
    const fs = await import("fs/promises");
    await fs.writeFile("./output.json", JSON.stringify(response, null, 2), "utf-8");
    console.log("JSON saved to output.json");
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

// const inputParagraph = `
// MUHAMMAD ALI SHAIR
// FULL-STACK WEB-DEVLOPER
// M.alishair666@gmail.com
//  Kohinoor City ,Faisalabad. 
// +923497719519
// GC University, FAISALABAD 
// B.S in Computer Sciences
// EDUCATION
// (Batch  2019 - 2023) 
// Secondary School
// JINNAH COLLEGE ,GOJRA
// SKILL(S)
// PROGRAMMING
// JavaScript / TypeScript
// PHP
// Languages:
// React.js / Next.js  
// Node js / Nest js / Hapi js
// Laravel
// Electron js
// Bootstrap / tailwind css
// j.Query
// Framework & Library:
// EXPERIENCE
// 2+ YEAR’s
// I achieved how to manage my Data Base Queries , Joins and
// relations using php and laravel and integrations using j.Query.
// SoftoMarket | GOJRA
// JAN  2022 - Oct. 2023
// PHP | LARAVEL | My SQL | JavaScript | j.Query | Bootstrap
// PROJECTS
// COURSE WORK
// OFFICE MANAGEMENT | THE LEARNER'S
// COMPUTER COLLEGE.
// Aug 2016
// RESEARCH AND COMPETITOR ANALYSIS IN
// SEO | ASPIRE COLLEGE FSD
// JULY 2021
// www.linkedin.com/in/m-ali-shair
// HTML
// Technology:
// CSS
// Mongo db
// Git & Github
// Vercel
// MySQL
// Trough out my work period at netixsol i worked on leapswap,
// leapBeta , Ecommerce App and blockplay as a Full Stack Devloper .
// Tailwind Css | React js | Next js | Node js | Electron js | Postgre Sql | MongoDB
// Netixsol | FAISLABAD
// Oct. 2023 - Present
// (Batch  2016 - 2018)
// aos
// Animations:
// Framer Motion
// Front-end: Developed the front-end and handled all integrations
// using jQuery.
// Backend: Built the backend with Laravel and MySQL.
// OTHERS
// Adobe illustrator
// Tools:
// Postgre SQL
// Canva
// Front-end: I developed the UI in Next js and tailwind css.
// Integrations / Web3: Handled platform integrations, including
// Web3 integrations using Wegme.
//     Blokkplay a gaming platform
// (+ Desktop App in electron js)
// Tailwind Css | Next js | Hapi js | Electron js | Postgre Sql | Framer Motion
//      LeapNetwork ,Leap-Beta ,LeapSwap web-3
// trading platforms
// Tailwind Css | Next js | Framer Motion | Wegme
//      (POS) Point Of Sale System
// PHP | Laravel | Jquery | Bootstrap
// Front-end: I managed UI design and handled integrations.
// Backend: I managed game event relations using Hapi.js and
// Tools:
// Postgre SQL
// Canva
// Front-end: I developed the UI in Next js and tailwind css.
// Integrations / Web3: Handled platform integrations, including
// Web3 integrations using Wegme.
//     Blokkplay a gaming platform
// (+ Desktop App in electron js)
// Tailwind Css | Next js | Hapi js | Electron js | Postgre Sql | Framer Motion
//      LeapNetwork ,Leap-Beta ,LeapSwap web-3
// trading platforms
// Tailwind Css | Next js | Framer Motion | Wegme
//      (POS) Point Of Sale System
// PHP | Laravel | Jquery | Bootstrap
// Front-end: I managed UI design and handled integrations.
// Backend: I managed game event relations using Hapi.js and
// Front-end: I developed the UI in Next js and tailwind css.
// Integrations / Web3: Handled platform integrations, including
// Web3 integrations using Wegme.
//     Blokkplay a gaming platform
// (+ Desktop App in electron js)
// Tailwind Css | Next js | Hapi js | Electron js | Postgre Sql | Framer Motion
//      LeapNetwork ,Leap-Beta ,LeapSwap web-3
// trading platforms
// Tailwind Css | Next js | Framer Motion | Wegme
//      (POS) Point Of Sale System
// PHP | Laravel | Jquery | Bootstrap
// Front-end: I managed UI design and handled integrations.
// Backend: I managed game event relations using Hapi.js and
// (+ Desktop App in electron js)
// Tailwind Css | Next js | Hapi js | Electron js | Postgre Sql | Framer Motion
//      LeapNetwork ,Leap-Beta ,LeapSwap web-3
// trading platforms
// Tailwind Css | Next js | Framer Motion | Wegme
//      (POS) Point Of Sale System
// PHP | Laravel | Jquery | Bootstrap
// Front-end: I managed UI design and handled integrations.
// Backend: I managed game event relations using Hapi.js and
// trading platforms
// Tailwind Css | Next js | Framer Motion | Wegme
//      (POS) Point Of Sale System
// PHP | Laravel | Jquery | Bootstrap
// Front-end: I managed UI design and handled integrations.
// Backend: I managed game event relations using Hapi.js and
// PostgreSQL and aslo maked many api’s.
// Desktop App: I Converted the web app into a desktop app using
// Electron.js.
// `;


// main(inputParagraph);
