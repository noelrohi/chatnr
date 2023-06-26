export const aqwfn = [
  {
    name: "get_aqw_equipped_items",
    description: "Get the equipped items of a player. Returns the list of items.",
    parameters: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "The ingame-name of the player",
        },
      },
      required: ["name"],
    },
  },
  {
    name: "get_aqw_inventory_details",
    description: "Get the items in inventory of a player.",
    parameters: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "The ingame-name of the player",
        },
      },
      required: ["name"],
    },
  },
];

export const aqw = {
  equipped: async (name: string) => {
    const response = await fetch(
      `https://multus-aqw-api.vercel.app/api/aqw/items/equipped?name=${name}`
    );
    const equippedItems = await response.json();
    return equippedItems;
  },
  items: async (name: string) => {
    const response = await fetch(
      `https://multus-aqw-api.vercel.app/api/aqw/items?name=${name}`
    );
    const equippedItems = await response.json();
    return equippedItems;
  },
};
