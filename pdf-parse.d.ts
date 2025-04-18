declare module 'pdf-parse' {
  interface PDFParseResult {
    text: string;
    numpages: number;
    numrender: number;
    info: Record<string, any>;
    metadata: Record<string, any>;
    version: string;
  }

  function pdfParse(dataBuffer: Buffer, options?: any): Promise<PDFParseResult>;
  
  export default pdfParse;
}