import { aqw, aqwfn } from "@/lib/functions/aqw";
import { get_pinned_repos, githubfn } from "@/lib/functions/gh";
import {
  get_story,
  get_story_with_comments,
  get_top_stories,
  hnfunctions,
  summarize_top_story,
} from "@/lib/functions/hn";

export const functions: {
  name: string;
  description: string;
  parameters: object;
}[] = [...hnfunctions, ...aqwfn, ...githubfn];

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
    case "get_pinned_repos":
      return await get_pinned_repos(args["username"]);
    case "get_aqw_equipped_items":
      return await aqw.equipped(args["name"]);
    case "get_aqw_inventory_details":
      return await aqw.items(args["name"]);
    default:
      return null;
  }
}
