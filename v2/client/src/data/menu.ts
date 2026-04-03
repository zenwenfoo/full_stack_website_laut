export type MenuItem = {
  id: string;            
  name: string;
  desc: string;
  price: number;    
  currency?: string;   
  tags?: string[];       
};

export type MenuSection = {
  id: string;            
  label: string;      
  items: MenuItem[];
};

export const SECTIONS: MenuSection[] = [
    {
        id: "starters",
        label: "starters",
        items: [
            {
                id: "salt-pepper-squid",
                name: "Salt & Pepper Squid",
                desc: "Crispy-fried squid tossed with Szechuan pepper and sea salt. Served with chili-lime aioli.",
                price: 22, currency: "MYR", tags: ["shellfish"]
            },
            {
                id: "thai-fishcakes",
                name: "Thai Fishcakes",
                desc: "Fragrant fish patties with green curry paste, herbs, and a sweet chili dip.",
                price: 18, currency: "MYR", tags: ["fish"]
            },
            {
                id: "oyster-trio",
                name: "Oyster Trio",
                desc: "A tasting flight of natural, ponzu, and charred chili oysters.",
                price: 28, currency: "MYR", tags: ["shellfish"]
            },
            {
                id: "crab-spring-rolls",
                name: "Crab Spring Rolls",
                desc: "Golden parcels of blue swimmer crab with tamarind dipping sauce.",
                price: 24, currency: "MYR", tags: ["crustacean"]
            },
            {
                id: "mussels-in-lemongrass-broth",
                name: "Mussels in Lemongrass Broth",
                desc: "Steamed mussels in a fragrant lemongrass, ginger, and chili broth. Finished with fresh herbs and lime.",
                price: 22, currency: "MYR", tags: ["shellfish"]
            },
            {
                id: "papaya-and-prawn-salad",
                name: "Papaya & Prawn Salad",
                desc: "Shredded green papaya, chili, lime, and grilled tiger prawns.",
                price: 23, currency: "MYR", tags: ["salad"]
            }, 
            {
                id: "tuna-tartare-on-wonton-crip",
                name: "Tuna Tartare on Wonton Crisp",
                desc: "Diced sashimi-grade tuna with soy, sesame, and pickled ginger.",
                price: 25, currency: "MYR", tags: ["fish"]
            },
            {
                id: "chilli-garlic-clams",
                name: "Chili Garlic Clams",
                desc: "Wok-tossed lala clams in spicy garlic sauce.",
                price: 21, currency: "MYR", tags: ["shellfish"]
            },
            {
                id: "soft-shell-crab-with-yuzu-aioli",
                name: "Soft-Shell Crab with Yuzu Aioli",
                desc: "Lightly battered and served with citrus yuzu dip.",
                price: 30, currency: "MYR", tags: ["crustacean"]
            },
            {
                id: "tempura-prawns",
                name: "Tempura Prawns",
                desc: "Crispy tiger prawns with wasabi mayo",
                price: 27, currency: "MYR", tags: ["shellfish"]
            },
        ]
    },
    {
        id: "mains",
        label: "mains",
        items: [
            {
                id: "natures=bounty",
                name: "Nature’s Bounty",
                desc: "Grilled medley of prawns, squid, scallops, and mussels in garlic butter broth.",
                price: 48, currency: "MYR", tags: ["shellfish"]
            },
            {
                id: "singapore-curry-crab-laksa",
                name: "Singapore Curry Crab Laksa",
                desc: "Whole crab in a rich coconut curry with laksa noodles.",
                price: 52, currency: "MYR", tags: ["crustacean"]
            },
            {
                id: "malaysian-prawn-mee",
                name: "Malaysian Prawn Mee",
                desc: "Aromatic noodle soup with tiger prawns, egg, and sambal.",
                price: 38, currency: "MYR", tags: ["shellfish"]
            },
            {
                id: "steamed-whole-sea-bass",
                name: "Steamed Whole Sea Bass",
                desc: "Served with soy-ginger scallion sauce.",
                price: 29, currency: "MYR", tags: ["fish"]
            },
            {
                id: "thai-green-seafood-curry",
                name: "Thai Green Seafood Curry",
                desc: "Prawns and fish in house-made green curry with jasmine rice.",
                price: 36, currency: "MYR", tags: ["shellfish"]
            },
            {
                id: "crispy-skin-barramundi",
                name: "Crispy Skin Barramundi",
                desc: "On lemongrass potato mash with chili-lime sauce.",
                price: 42, currency: "MYR", tags: ["fish"]
            },
            {
                id: "chilli-crab-linguine",
                name: "Chili Crab Linguine",
                desc: "Spicy tomato-chili sauce tossed with crab meat.",
                price: 40, currency: "MYR", tags: ["crustacean"]
            },
            {
                id: "sambal-grilled-stingray",
                name: "Sambal Grilled Stingray",
                desc: "Banana-leaf grilled with fiery sambal.",
                price: 44, currency: "MYR", tags: ["fish"]
            },
            {
                id: "seafood-nasi-lemak",
                name: "Seafood Nasi Lemak",
                desc: "A coastal take on the classic—anchovies, prawns, squid sambal, and coconut rice.",
                price: 30, currency: "MYR", tags: ["shellfish"]
            },
            {
                id: "salted-egg-yolk-prawns",
                name: "Salted Egg Yolk Prawns",
                desc: "Crispy prawns coated in creamy salted egg sauce.",
                price: 39, currency: "MYR", tags: ["shellfish"]
            },
        ]
    },
    {
        id: "shellfish",
        label: "shellfish",
        items: [
            {
                id: "malaysian-stir-fried-chili-clams",
                name: "Malaysian Stir-Fried Chili Clams",
                desc: "Wok-fried with chili, garlic, and fermented bean paste.",
                price: 25, currency: "MYR", tags: ["shellfish"]
            },
            {
                id: "garlic-butter-lobster",
                name: "Garlic Butter Lobster",
                desc: "Half lobster glazed in garlic-herb butter.",
                price: 88, currency: "MYR", tags: ["crustacean"]
            },
            {
                id: "black-pepper-crab",
                name: "Black Pepper Crab",
                desc: "Fiery Sarawak pepper sauce with whole crab.",
                price: 68, currency: "MYR", tags: ["crustacean"]
            },
            {
                id: "sambal-prawns",
                name: "Sambal Prawns",
                desc: "Tiger prawns in house sambal with curry leaves.",
                price: 43, currency: "MYR", tags: ["shellfish"]
            },
            {
                id: "grilled-scallops-with-xo-sauce",
                name: "Grilled Scallops with XO Sauce",
                desc: "Seared and glazed with umami-rich XO sauce.",
                price: 40, currency: "MYR", tags: ["shellfish"]
            },
            {
                id: "thai-chili-mussels",
                name: "Thai Chili Mussels",
                desc: "Mussels in spicy coconut milk and Thai basil.",
                price: 28, currency: "MYR", tags: ["shellfish"]
            },
            {
                id: "wok-tossed-crayfish",
                name: "Wok-Tossed Crayfish",
                desc: "Black bean sauce with spring onions and garlic.",
                price: 55, currency: "MYR", tags: ["fish"]
            },
            {
                id: "glass-noodle-claypot-prawns",
                name: "Glass Noodle Claypot Prawns",
                desc: "With soy, garlic, and coriander root.",
                price: 38, currency: "MYR", tags: ["shellfish"]
            },
            {
                id: "clam-skewers-with-lemongrass",
                name: "Clam Skewers with Lemongrass",
                desc: "Grilled over charcoal and brushed with chili oil.",
                price: 22, currency: "MYR", tags: ["shellfish"]
            },
            {
                id: "crab-omelette",
                name: "Crab Omelette",
                desc: "Soft folded eggs with crab meat, scallions, and chili soy.",
                price: 30, currency: "MYR", tags: ["crustacean"]
            },
        ]
    },
    {
        id: "fromthegrill",
        label: "fromthegrill",
        items: [
            {
                id: "thai-grilled-tiger-prawns",
                name: "Thai Grilled Tiger Prawns",
                desc: "Marinated in turmeric, lemongrass, and lime.",
                price: 42, currency: "MYR", tags: ["shellfish"]
            },
            {
                id: "chargrilled-octopus",
                name: "Chargrilled Octopus",
                desc: "With romesco sauce and pickled fennel.",
                price: 46, currency: "MYR", tags: ["fish"]
            },
            {
                id: "teriyaki-salmon-skewers",
                name: "Teriyaki Salmon Skewers",
                desc: "Glazed with house-made teriyaki and sesame seeds.",
                price: 36, currency: "MYR", tags: ["fish"]
            },
            {
                id: "smoky-mackerel-with-lime-salt",
                name: "Smoky Mackerel with Lime Salt",
                desc: "Served whole with charred calamansi.",
                price: 35, currency: "MYR", tags: ["fish"]
            },
            {
                id: "swordfish-steak-with-cajun-rub",
                name: "Swordfish Steak with Cajun Rub",
                desc: "With grilled corn salsa and aioli.",
                price: 50, currency: "MYR", tags: ["fish"]
            },
            {
                id: "grilled-pineapple-squid",
                name: "Grilled Pineapple Squid",
                desc: "Sticky chili caramel glaze with smoky edges.",
                price: 37, currency: "MYR", tags: ["fish"]
            },
            {
                id: "grilled-barramundi-in-banana-leaf",
                name: "Grilled Barramundi in Banana Leaf",
                desc: "With coconut sambal and torch ginger.",
                price: 41, currency: "MYR", tags: ["fish"]
            },
            {
                id: "surf-and-turf-duo",
                name: "Surf & Turf Duo",
                desc: "Skewered beef cubes and grilled prawns.",
                price: 58, currency: "MYR", tags: ["shellfish"]
            },
            {
                id: "tandoori-sea-bream",
                name: "Tandoori Sea Bream",
                desc: "Clay oven–style marinated and chargrilled.",
                price: 40, currency: "MYR", tags: ["fish"]
            },
            {
                id: "bbq-chili-butter-scallops",
                name: "BBQ Chili Butter Scallops",
                desc: "On half shells with micro coriander.",
                price: 38, currency: "MYR", tags: ["shellfish"]
            },
        ]
    },
    {
        id: "drinks",
        label: "drinks",
        items: [
            {
                id: "lemongrass-mojito",
                name: "Lemongrass Mojito",
                desc: "Rum, lemongrass syrup, lime, mint, soda.",
                price: 18, currency: "MYR"
            },
            {
                id: "thai-basil-smash",
                name: "Thai Basil Smash",
                desc: "Gin, basil, lime, and cucumber.",
                price: 20, currency: "MYR"
            },
            {
                id: "chili-mango-mojito",
                name: "Chili Mango Mojito",
                desc: "Mango purée, rum, mint, and a chili kick.",
                price: 19, currency: "MYR"
            },
            {
                id: "salted-calamansi-soda",
                name: "Salted Calamansi Soda",
                desc: "Fizzy, citrusy, and just a bit salty.",
                price: 12, currency: "MYR"
            },
            {
                id: "kaffit-lime-g-and-t",
                name: "Kaffir Lime G&T",
                desc: "Aromatic twist on the classic.",
                price: 12, currency: "MYR"
            },
            {
                id: "cold-brew-oolong",
                name: "Cold-Brew Oolong",
                desc: "Iced, with orange peel and herbs.",
                price: 10, currency: "MYR"
            },
            {
                id: "sparkling-yuzu-lemonade",
                name: "Sparkling Yuzu Lemonade",
                desc: "Light, tart, and refreshing.",
                price: 14, currency: "MYR"
            },
            {
                id: "pineapple-rum-punch",
                name: "Pineapple Rum Punch",
                desc: "Rum shaken with pineapple, citrus, and a dash of spice.",
                price: 20, currency: "MYR"
            },
            {
                id: "coconut-lychee-martini",
                name: "Coconut Lychee Martini",
                desc: "Velvety coconut and sweet lychee over chilled vodka.",
                price: 21, currency: "MYR"
            },
            {
                id: "spicy-ginger-margarita",
                name: "Spicy Ginger Margarita",
                desc: "Tequila and lime with a ginger-chili kick.",
                price: 22, currency: "MYR"
            },
        ]
    },
    {
        id: "dessert",
        label: "dessert",
        items: [
            {
                id: "mango-sticky-rice",
                name: "Mango Sticky Rice",
                desc: "Fragrant jasmine rice with ripe mango and coconut cream.",
                price: 16, currency: "MYR", tags: ["fruit"]
            },
            {
                id: "coconut-pandan-panna-cotta",
                name: "Coconut Pandan Panna Cotta",
                desc: "Smooth and wobbly with gula melaka syrup.",
                price: 17, currency: "MYR", tags: ["fruit"]
            },
            {
                id: "chili-chocolate-mousse",
                name: "Chili Chocolate Mousse",
                desc: "Rich dark chocolate with a warm chili finish.",
                price: 18, currency: "MYR", tags: ["chocolate"]
            },
            {
                id: "black-sesame-ice-cream",
                name: "Black Sesame Ice Cream",
                desc: "Nutty, earthy, and creamy.",
                price: 14, currency: "MYR", tags: ["dairy"]
            },
            {
                id: "lemongrass-creme-brulee",
                name: "Lemongrass Crème Brûlée",
                desc: "Aromatic custard with a crackly sugar crust.",
                price: 19, currency: "MYR", tags: ["sugar"]
            },
            {
                id: "banana-spring-rolls",
                name: "Banana Spring Rolls",
                desc: "With palm sugar caramel and sesame.",
                price: 15, currency: "MYR", tags: ["fruit"]
            },
            {
                id: "thai-tea-tiramisu",
                name: "Thai Tea Tiramisu",
                desc: "A Southeast Asian remix of the classic.",
                price: 20, currency: "MYR", tags: ["coffee"]
            },
            {
                id: "durian-cheesecake",
                name: "Durian Cheesecake",
                desc: "Bold and creamy for the adventurous.",
                price: 22, currency: "MYR", tags: ["dairy"]
            },
            {
                id: "pineapple-tart",
                name: "Pineapple Tart",
                desc: "Spiced syrup glaze and shortcrust base.",
                price: 16, currency: "MYR", tags: ["fruit"]
            },
            {
                id: "coconut-sorbet",
                name: "Coconut Sorbet",
                desc: "Light and frosty finish to any meal.",
                price: 12, currency: "MYR", tags: ["fruit"]
            },
        ],
    },
];
