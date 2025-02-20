import arg             from "arg";
import semanticRelease from "semantic-release";
import * as path       from "node:path";
import * as fs         from "node:fs";
import * as process    from "node:process";

const args = arg({
   // Input file path of the project root file. Required.
   "--input-file": String,
   "-i":           "--input-file",
   // JSON Path to the version field. Optional. Default: "version"
   "--version-field": String,
   "-f":              "--version-field",
});

if (!args["--input-file"]) throw new Error("missing required argument --input-file");
const filePath = path.resolve(args["--input-file"]);
if (!fs.existsSync(filePath)) throw new Error(`File not found: "${filePath}"`);

const result = await semanticRelease({
      repositoryUrl: process.env.CI_REPOSITORY_URL,
      branches:      ["master"],
      noCi:          true,
      plugins:       [
         [
            "semantic-release-plugin",
            {
               targetFile: {
                  path:           filePath,
                  versionKeyPath: args["--version-field"] ?? "version",
               },
            },
         ],
         [
            "@semantic-release/commit-analyzer",
            {},
         ],
         [
            "@semantic-release/release-notes-generator",
            {},
         ],
      ],
   },
   {
      cwd: path.dirname(filePath),
   },
);

if (!result) {
   console.log("No release published.");
   process.exit(0);
}

const {lastRelease, nextRelease} = result;

console.log({
   lastRelease,
   nextRelease,
});