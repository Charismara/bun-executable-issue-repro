import * as TOML from "@iarna/toml";

interface FileHandler {
   parse: (file: string) => any;
   stringify: (data: any) => string;
}

export function getFileHandler(file: string): FileHandler {
   if (file.endsWith(".json")) return JSON;
   if (file.endsWith(".toml")) return TOML;
   throw new Error(`Unsupported file type: ${file}`);
}