import type {PrepareContext, PublishContext} from "semantic-release";
import debugFactory                          from "debug";

const debug = debugFactory("semantic-release:custom-plugin");

export type PluginConfig = {
   targetFile: {
      path: string,
      versionKeyPath: string,
   }
}

export async function prepare({}: PluginConfig, {}: PrepareContext) {

}

export async function publish({}: PluginConfig, {}: PublishContext) {

}