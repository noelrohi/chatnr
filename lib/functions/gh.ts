export const githubfn = [
  {
    name: "get_pinned_repos",
    description:
      "Get a list of pinned repos for a given GitHub username. Returns the list of title, description, link, language, owner and website in markdown format.",
    parameters: {
      type: "object",
      properties: {
        username: {
          type: "string",
          description: "The GitHub username",
        },
      },
      required: ["username"],
    },
  },
];


export async function get_pinned_repos(username: string) {
  const response = await fetch(
    `https://rohi.dev/api/pinnedRepos?username=${username}`
  );
  const repos = await response.json();
  return repos.data;
}