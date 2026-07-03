const MENU = {
  categories: [
    {
      id: "breakfast-burritos",
      name: "Breakfast Burritos",
      enabled: true,
      items: [
        {
          id: "egg-chorizo",
          name: "Egg with Chorizo",
          description: "Fresh scrambled eggs with flavorful Mexican chorizo.",
          price: 5.00,
          enabled: true,
          soldOut: false
        },
        {
          id: "egg-mex",
          name: "Egg a la Mex",
          description: "Scrambled eggs with classic Mexican-style flavor.",
          price: 5.00,
          enabled: true,
          soldOut: false
        },
        {
          id: "egg-bacon",
          name: "Egg and Bacon",
          description: "Scrambled eggs with crispy bacon in a warm tortilla.",
          price: 6.00,
          enabled: true,
          soldOut: false
        },
        {
          id: "bean-cheese",
          name: "Bean and Cheese",
          description: "A simple classic with beans and melted cheese.",
          price: 4.25,
          enabled: true,
          soldOut: false
        },
        {
          id: "egg-ham",
          name: "Egg and Ham",
          description: "Scrambled eggs with savory ham.",
          price: 5.00,
          enabled: true,
          soldOut: false
        },
        {
          id: "chile-verde",
          name: "Chile Verde",
          description: "Tender chile verde flavor wrapped fresh.",
          price: 7.00,
          enabled: true,
          soldOut: false
        },
        {
          id: "picadillo",
          name: "Picadillo",
          description: "Traditional picadillo in a warm flour tortilla.",
          price: 6.00,
          enabled: true,
          soldOut: false
        },
        {
          id: "carne-picada",
          name: "Carne Picada",
          description: "Seasoned carne picada with bold breakfast flavor.",
          price: 5.75,
          enabled: true,
          soldOut: false
        }
      ]
    }
  ],
  extras: [
    {
      id: "beans",
      name: "Add Beans",
      price: 0.25,
      enabled: true
    },
    {
      id: "tomatillo-salsa",
      name: "Tomatillo Salsa",
      price: 0,
      enabled: false
    },
    {
      id: "red-salsa",
      name: "Red Salsa",
      price: 0,
      enabled: false
    }
  ],
  beverages: [
    { id: "coke", name: "Coke", category: "Soft Drinks", price: 1.00, enabled: true },
    { id: "sprite", name: "Sprite", category: "Soft Drinks", price: 1.00, enabled: true },
    { id: "dr-pepper", name: "Dr Pepper", category: "Soft Drinks", price: 1.00, enabled: true },
    { id: "coco-agua", name: "Coco Agua", category: "Agua Frescas", price: 4.50, enabled: true },
    { id: "watermelon-agua", name: "Watermelon Agua", category: "Agua Frescas", price: 4.50, enabled: true },
    { id: "horchata", name: "Horchata", category: "Agua Frescas", price: 4.50, enabled: true }
  ]
};
