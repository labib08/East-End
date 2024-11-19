import flat_white from '../Assets/flat_white.jpeg';
import red_velvet from '../Assets/red_velvet.jpg';
interface Items {
    id: string;
    name: string;
    image: string;
    price: number;
    description: string;
    type: string;
}

export const itemData: Items[]= [
    {
        id: "1",
        name: "Cappuccino",
        image: flat_white,
        price: 4.5,
        description: "A classic Italian coffee made with equal parts espresso, steamed milk, and velvety milk foam. Its rich, bold flavor and creamy texture make it a perfect balance of strength and smoothness.",
        type: "Coffee",
    },
    {
        id: "2",
        name: "Flat White",
        image: flat_white,
        price: 4.0,
        description: "A smooth and velvety coffee made with a shot of espresso and steamed milk, topped with a thin layer of microfoam. Known for its creamy texture and rich flavor, it offers a perfect balance of espresso strength and milk sweetness.",
        type: "Coffee",
    },
    {
        id: "3",
        name: "Caffe macchiato",
        image: flat_white,
        price: 5.0,
        description: "A simple yet bold espresso-based coffee made by adding a small amount of steamed milk or foam to a shot of espresso. It’s a perfect choice for those who enjoy the intense flavor of espresso with just a hint of creaminess.",
        type: "Coffee",
    },
    {
        id: "4",
        name: "Americano",
        image: flat_white,
        price: 3.5,
        description: "A straightforward coffee made by diluting a shot of espresso with hot water, resulting in a rich, smooth flavor that's less intense than straight espresso but still full-bodied.",
        type: "Coffee",
    },
    {
        id: "5",
        name: "Latte",
        image: flat_white,
        price: 4.0,
        description: "A creamy coffee drink made with a shot of espresso and steamed milk, topped with a thin layer of milk foam. Known for its smooth and velvety texture, the latte offers a perfect balance of bold espresso and rich milk.",
        type: "Coffee",
    },
    {
        id: "6",
        name: "Espresso",
        image: flat_white,
        price: 3.0,
        description: "A strong and concentrated coffee made by forcing hot water through finely-ground coffee beans. Served in small, intense shots, it delivers a rich, full-bodied flavor with a thick layer of crema on top.",
        type: "Coffee",
    },
    {
        id: "7",
        name: "Black Coffee",
        image: flat_white,
        price: 2.0,
        description: "A simple, straightforward brew made by steeping ground coffee beans in hot water, without any added milk or sugar. Known for its bold, rich flavor, it’s the perfect choice for those who appreciate the pure, unaltered taste of coffee in its most authentic form.",
        type: "Coffee",
    },
    {
        id: "8",
        name: "Mocha",
        image: flat_white,
        price: 6.5,
        description: "A deliciously indulgent coffee drink made with espresso, steamed milk, and chocolate syrup, topped with whipped cream. Combining the rich flavors of coffee and chocolate, it offers a sweet and creamy treat perfect for those who love a dessert-like coffee experience.",
        type: "Coffee",
    },
    {
        id: "9",
        name: "Turkish Coffee",
        image: flat_white,
        price: 7.5,
        description: "A traditional and aromatic coffee made by slowly boiling finely ground coffee beans with water and sugar in a special pot called a cezve. Served in small cups, it has a rich, bold flavor and a thick, smooth texture, often enjoyed with a side of sweet treats.",
        type: "Coffee",
    },
    {
        id: "10",
        name: "Cortado",
        image: flat_white,
        price: 10.0,
        description: "A balanced coffee made with equal parts espresso and steamed milk, creating a smooth and rich flavor with a creamy texture. The milk slightly softens the boldness of the espresso, making it a perfect choice for those who enjoy a strong coffee taste without the intensity of straight espresso.",
        type: "Coffee",
    },
    {
        id: "11",
        name: "Bulletproof Coffee",
        image: flat_white,
        price: 2.5,
        description: "A rich and energizing drink made with freshly brewed coffee, grass-fed butter, and medium-chain triglyceride (MCT) oil. Blended to create a creamy, frothy texture, it offers a smooth, satisfying taste and is often enjoyed as a high-energy, low-carb alternative to traditional breakfasts.",
        type: "Coffee",
    },
    {
        id: "12",
        name: "Affogato",
        image: flat_white,
        price: 4.0,
        description: "A delightful dessert coffee made by pouring a shot of hot espresso over a scoop of vanilla ice cream or gelato. The contrast between the warm, rich espresso and the cold, creamy ice cream creates a deliciously indulgent treat, perfect for coffee and dessert lovers alike.",
        type: "Coffee",
    },
    {
        id: "13",
        name: "Cafe au lait",
        image: flat_white,
        price: 4.5,
        description: "A French coffee drink made with equal parts brewed coffee and steamed milk. It offers a smooth, creamy texture with a bold coffee flavor, making it a perfect choice for those who prefer a milder coffee experience compared to espresso-based drinks.",
        type: "Coffee",
    },
    {
        id: "14",
        name: "Long black",
        image: flat_white,
        price: 6.0,
        description: "A a popular coffee drink made by pouring hot water over a shot of espresso. This method preserves the espresso's rich flavor and crema, resulting in a smooth, full-bodied coffee with a slightly milder taste compared to an espresso.",
        type: "Coffee",
    },
    {
        id: "15",
        name: "Ristretto",
        image: flat_white,
        price: 4.5,
        description: "A short, concentrated shot of espresso made with less water, resulting in a more intense and flavorful coffee. It has a rich, full-bodied taste with a slightly sweeter, smoother profile than a regular espresso, making it perfect for those who appreciate a bold yet balanced coffee experience.",
        type: "Coffee",
    },
    {
        id: "16",
        name: "Lungo",
        image: flat_white,
        price: 4.5,
        description: "A type of espresso made with more water, resulting in a larger, milder coffee with a smooth, rich flavor. It’s less intense than a traditional espresso, offering a well-balanced taste ideal for those who prefer a less concentrated coffee experience.",
        type: "Coffee",
    },
    {
        id: "17",
        name: "Cold brew",
        image: flat_white,
        price: 4.5,
        description: "A coffee made by steeping coarsely ground coffee beans in cold water for an extended period, typically 12-24 hours. The result is a smooth, less acidic coffee with a rich, mellow flavor, often served over ice for a refreshing, energizing drink.",
        type: "Coffee",
    },
    {
        id: "18",
        name: "Iced coffee",
        image: flat_white,
        price: 4.5,
        description: "A chilled coffee beverage made by brewing coffee and then cooling it down with ice. It offers a refreshing, bold flavor, perfect for warm weather, and can be sweetened or flavored with milk, cream, or syrups for a customizable taste.",
        type: "Coffee",
    },
    {
        id: "19",
        name: "Cappuccino",
        image: flat_white,
        price: 4.5,
        description: "A classic Italian coffee drink made with equal parts espresso, steamed milk, and frothed milk. Known for its creamy texture and rich flavor, it’s typically topped with a dusting of cocoa or cinnamon for an extra touch of indulgence.",
        type: "Coffee",
    },
    {
        id: "20",
        name: "Doppio",
        image: flat_white,
        price: 4.5,
        description: "A double shot of espresso, offering a richer, bolder flavor than a single shot. It’s made by extracting twice the amount of coffee, resulting in a stronger and more intense espresso experience. Ideal for coffee lovers who prefer a more robust taste.",
        type: "Coffee",
    },
    {
        id: "21",
        name: "Cappuccino",
        image: flat_white,
        price: 4.5,
        description: "A popular coffee drink made with equal parts espresso, steamed milk, and frothed milk. Known for its creamy texture and rich, bold flavor, it’s often topped with a light dusting of cocoa or cinnamon for an extra touch of indulgence.",
        type: "Coffee",
    },
    {
        id: "22",
        name: "Irish coffee",
        image: flat_white,
        price: 4.5,
        description: "A warm cocktail made with hot coffee, Irish whiskey, sugar, and topped with a layer of lightly whipped cream. Its rich, smooth flavor combines the boldness of coffee with the warmth of whiskey, making it a comforting and indulgent drink.",
        type: "Coffee",
    },
    {
        id: "23",
        name: "Red Eye",
        image: flat_white,
        price: 4.5,
        description: "A coffee drink made by combining a regular drip coffee with a shot of espresso. This bold, high-energy beverage offers an extra caffeine kick, perfect for those looking for a stronger, more invigorating coffee experience.",
        type: "Coffee",
    },
    {
        id: "24",
        name: "Drip coffee",
        image: flat_white,
        price: 4.5,
        description: "A popular brewing method where hot water is poured over ground coffee, allowing it to filter through a coffee maker or drip cone. The result is a smooth, flavorful cup of coffee with a clean taste, perfect for everyday enjoyment.",
        type: "Coffee",
    },
    {
        id: "25",
        name: "Double Espresso",
        image: flat_white,
        price: 4.5,
        description: "A coffee made by brewing two shots of espresso from the same amount of ground coffee. It offers a stronger, more intense flavor compared to a single shot, providing a bold, concentrated coffee experience.",
        type: "Coffee",
    },
    {
        id: "26",
        name: "Cheesecake",
        image: red_velvet,
        price: 7.5,
        description: "A timeless dessert made with a smooth, velvety filling set atop a buttery, crumbly crust. Perfect for any occasion, it can be enjoyed plain or topped with a variety of fruits, chocolate, or caramel for added flavor.",
        type: "Dessert",
    },
    {
        id: "27",
        name: "Red velvet cake",
        image: red_velvet,
        price: 10.0,
        description: "A striking, vibrant dessert known for its rich, velvety texture and distinct red color. With a mild cocoa flavor and a hint of tanginess from cream cheese or buttercream frosting, it's a perfect treat for celebrations and special occasions.",
        type: "Dessert",
    },
    {
        id: "28",
        name: "Chocolate cake",
        image: red_velvet,
        price: 8.5,
        description: "A decadent and moist dessert made with rich cocoa, offering a deep, satisfying chocolate flavor. Often layered with creamy frosting or ganache, it’s a beloved treat for any chocolate lover.",
        type: "Dessert",
    },
    {
        id: "29",
        name: "Vanilla cake",
        image: red_velvet,
        price: 8.5,
        description: "A light, fluffy dessert with a soft, sweet flavor. Made with simple ingredients, it has a delicate taste that pairs beautifully with a variety of frostings, from creamy buttercream to rich chocolate ganache.",
        type: "Dessert",
    },
    {
        id: "30",
        name: "Tiramisu",
        image: red_velvet,
        price: 12,
        description: "A classic Italian dessert made with layers of coffee-soaked ladyfingers, rich mascarpone cheese, and a dusting of cocoa powder. Its perfect balance of sweet and espresso flavors, combined with a creamy texture, makes it an irresistible treat for any occasion.",
        type: "Dessert",
    },
    {
        id: "31",
        name: "Maltesers tiramisu",
        image: red_velvet,
        price: 12.5,
        description: "A delicious twist on the classic Italian dessert, featuring layers of coffee-soaked ladyfingers, creamy mascarpone, and crunchy Maltesers for added texture and flavor. The perfect combination of sweet, rich, and slightly malty, it’s a unique treat that’s sure to impress.",
        type: "Dessert",
    },
    {
        id: "32",
        name: "Brownie",
        image: red_velvet,
        price: 5.0,
        description: "A rich, fudgy dessert with a dense, chocolatey texture. Often topped with nuts or a dusting of powdered sugar, it’s a perfect balance of sweetness and decadence, ideal for any chocolate lover.",
        type: "Dessert",
    },
    {
        id: "33",
        name: "Chocolate Mousse",
        image: red_velvet,
        price: 8.5,
        description: "A rich, velvety dessert made with creamy chocolate, whipped cream, and eggs, creating a light, airy texture. Its indulgent chocolate flavor makes it a perfect treat for any occasion.",
        type: "Dessert",
    },
    {
        id: "34",
        name: "Lemon cake",
        image: red_velvet,
        price: 4.5,
        description: "A light, moist dessert with a refreshing citrus flavor. Made with fresh lemon zest and juice, it offers a perfect balance of sweetness and tang, often paired with a creamy frosting or glaze for an extra burst of flavor.",
        type: "Dessert",
    },
    {
        id: "35",
        name: "Butter cake",
        image: red_velvet,
        price: 4.5,
        description: "A rich, moist dessert made with simple ingredients, including butter, sugar, eggs, and flour. Its tender crumb and deliciously buttery flavor make it a timeless treat, perfect on its own or paired with frosting, fruits, or a dusting of powdered sugar.",
        type: "Dessert",
    },
    {
        id: "36",
        name: "Sticky Date Pudding",
        image: red_velvet,
        price: 7.0,
        description: "A warm, indulgent dessert made with moist dates, brown sugar, and a rich toffee sauce. Often served with vanilla ice cream or cream, its deep, sweet flavor and comforting texture make it a perfect treat for any occasion.",
        type: "Dessert",
    },
    {
        id: "37",
        name: "Mud Cake",
        image: red_velvet,
        price: 9.0,
        description: "A dense, rich chocolate cake with a fudgy, moist texture. Made with dark chocolate and often paired with a creamy frosting or ganache, it’s a decadent treat perfect for special occasions or any chocolate lover.",
        type: "Dessert",
    },
    {
        id: "38",
        name: "Amaretto brulee",
        image: red_velvet,
        price: 8.5,
        description: "A creamy, indulgent dessert made with a rich custard base flavored with amaretto liqueur. Topped with a perfectly caramelized sugar crust, it offers a delightful contrast of smoothness and crunch, making it a luxurious treat for any occasion.",
        type: "Dessert",
    },
    {
        id: "39",
        name: "Black forest trifles",
        image: red_velvet,
        price: 9.5,
        description: "A layered dessert featuring rich chocolate cake, sweetened cherries, whipped cream, and a hint of chocolate shavings. A twist on the classic Black Forest cake, this indulgent treat offers a perfect balance of flavors and textures in every spoonful.",
        type: "Dessert",
    },
    {
        id: "40",
        name: "Chocolate Peanut Butter Cake",
        image: red_velvet,
        price: 5.5,
        description: "A a decadent dessert that combines rich, moist chocolate cake with a creamy peanut butter filling. It’s the perfect treat for those who love the irresistible combination of chocolate and peanut butter.",
        type: "Dessert",
    },
];