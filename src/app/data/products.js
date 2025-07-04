const products = [
  {
    _id: "1", 
    title: "Постељина",
    description: "100% памук, удобна и квалитетна постељина.",
    image: "/images/posteljina.png",
    category: "Постељине",
    price: 2190,
    inStock: true,
    sizes: ["200x140", "160x140", "140x140"],
    colors: ["бела", "крем"],
    discount: 10,
  },
  {
    _id: "2", 
    title: "Прекривач",
    description: "Удобан и погодан за сва годишња доба.",
    image: "/images/prekrivac.png",
    category: "Прекривачи",
    price:2390,
    inStock: true,
    sizes: ["200x140", "160x140", "140x140"],
    colors: ["бела", "крем"],
    discount: 5,
  },
  {
    _id: "3", 
    title: "Јастук ",
    description: "Удобан и сачињен од меморијске пене.",
    image: "/images/jastuk.png",
    category: "Јастуци",
    price: 990,
    inStock: true,
    sizes: ["75x75", "60x40", "50x50"],
    colors: ["бела", "крем"],
  },
];

export default products;
