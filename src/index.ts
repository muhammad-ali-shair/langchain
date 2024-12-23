import fs from 'fs';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import { main } from './ai';

async function extractFromPdf(filePath:string) {
  const dataBuffer = fs.readFileSync(filePath);
  try {
    const data = await pdfParse(dataBuffer);
    // console.log(data);
    
    return data.text;
  } catch (error) {
    console.error("Error reading PDF:", error);
    return null;
  }
}

async function extractFromDocx(filePath:string) {
  const fileBuffer = fs.readFileSync(filePath);
  try {
    const result = await mammoth.extractRawText({ buffer: fileBuffer });
    return result.value;
  } catch (error) {
    console.error("Error reading DOCX:", error);
    return null;
  }
}

async function extractText(filePath:any) {
  console.log("ssdkjfkj");
  
  const extension = filePath.split('.').pop().toLowerCase();
  
  if (extension === 'pdf') {
    return await extractFromPdf(filePath);
  } else if (extension === 'docx') {
    return await extractFromDocx(filePath);
  } else {
    console.error("Unsupported file type. Only PDF and DOCX are supported.");
    return null;
  }
}


const filePath = __dirname+"/alishair.pdf"; // this is my file path
if (!filePath) {
  console.error("Please provide a file path.");
  process.exit(1);
}

extractText(filePath)
  .then((text) => {
     if (text) {
       main(text)
     }
  })
  .catch((error) => {
    console.error("An error occurred:", error);
  });
