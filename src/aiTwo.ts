import { JsonOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { HuggingFaceInference } from "@langchain/community/llms/hf";

// Define your desired data structure.
interface ExtractedDetails {
  summary: string;                      // A brief summary of the individual
  email: string;                        // Contact email
  name: string;                         // Full name
  phone: string;                        // Phone number
  address: string;                      // Physical address
  skills: string[];                     // Array of skills
  areaOfInterests: string[];            // Array of areas of interest
  experience: Array<{                  // Array of work experience
    companyName: string;                // Company name
    location: string;                   // Company location
    date: string;                       // Duration/Date of experience
  }>;
  education: Array<{                    // Array of educational qualifications
    title: string;                      // Degree/Qualification title
    institute: string;                  // Institute/University name
    date: string;                       // Date of graduation
  }>;
  projects: Array<{                     // Array of projects
    name: string;                       // Project name
    technologies: string[];             // Technologies used in the project
  }>;
  certificatesAndCourses: Array<{      // Array of certificates and courses
    title: string;                      // Certificate/Course name
    institute: string;                  // Issuing institute
    date: string;                       // Date of completion
  }>;
}


export async function main(inputParagraph:string) {
// Input paragraph

// Format instructions
const formatInstructions = `
Respond with a valid JSON object containing the following fields, with no additional text outside the JSON:
- summary: A brief string summarizing the person's background or profile.
- email: The person's email address.
- name: The person's full name.
- phone: The person's phone number.
- address: The person's physical address.
- skills: An array of skills the person possesses.
- areaOfInterests: An array of the person's areas of interest.
- experience: An array of objects, each containing the following keys:
  - companyName: The name of the company.
  - location: The location of the company.
  - date: The date or duration of employment.
- education: An array of objects, each containing the following keys:
  - title: The degree or title received.
  - institute: The name of the institution.
  - date: The date the degree was awarded.
- projects: An array of objects with keys:
  - name: The name of the project.
  - technologies: An array of technologies used in the project.
- certificatesAndCourses: An array of objects with keys:
  - title: The title of the certificate or course.
  - institute: The institution or organization issuing the certificate/course.
  - date: The date of completion.

If any information is missing or unavailable, the corresponding field should be null.

Only return the JSON object with the appropriate keys and values.
`;

// Set up a Hugging Face model
const hfModel = new HuggingFaceInference({
  apiKey: "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",
  model: "hiieu/Meta-Llama-3-8B-Instruct-function-calling-json-mode",
  temperature: 0.8,
  maxTokens: 500,
});

// Set up a parser + inject instructions into the prompt template
const parser = new JsonOutputParser<ExtractedDetails>();

const prompt = ChatPromptTemplate.fromTemplate(
  "If any information is missing or unavailable, the corresponding field should be null.Extract the details from the paragraph.\n{format_instructions}\nParagraph: {paragraph}\n"
);

const partialedPrompt = await prompt.partial({
  format_instructions: formatInstructions,
});

// const chain = partialedPrompt.pipe(hfModel);
const chain = partialedPrompt.pipe(hfModel);
// const chain = partialedPrompt.pipe(hfModel).pipe(parser);


  try {
    // Invoke the chain
    const response = await chain.invoke({ paragraph: inputParagraph });
    console.log("Extracted Details in JSON Format:", response);

    // Save to file (optional)
    // const fs = await import("fs/promises");
    // await fs.writeFile("./output.json", JSON.stringify(response, null, 2), "utf-8");
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
