import { aqw, aqwfn } from "@/lib/functions/aqw";
import { enime, enimeFN } from "@/lib/functions/enime";
import {
  get_story,
  get_story_with_comments,
  get_top_stories,
  hnfunctions,
  summarize_top_story,
} from "@/lib/functions/hn";
import { ChatCompletionFunctions } from "openai-edge";

export const functions: ChatCompletionFunctions[] = [
  ...hnfunctions,
  ...aqwfn,
  ...enimeFN,
];

export async function runFunction(name: string, args: any) {
  switch (name) {
    case "get_top_stories":
      return await get_top_stories();
    case "get_story":
      return await get_story(args["id"]);
    case "get_story_with_comments":
      return await get_story_with_comments(args["id"]);
    case "summarize_top_story":
      return await summarize_top_story();
    case "get_aqw_equipped_items":
      return await aqw.equipped(args["name"]);
    case "get_aqw_inventory_details":
      return await aqw.items(args["name"]);
    case "get_recently_released_anime_episode":
      return await enime.recent();
    case "get_popular_anime":
      return await enime.popular();
    default:
      return null;
  }
}
