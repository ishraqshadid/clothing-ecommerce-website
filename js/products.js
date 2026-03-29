/**
 * /js/products.js
 * ─────────────────────────────────────────────────────────────────────────────
 * PRODUCT DATA FILE — Source of truth for all product information.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const products =[
  /* ─── TRENDING / HERO ITEMS ─────────────────────────────────────── */
  {
    id: 101,
    name: "Classic Matcha Tee",
    price: 39.99,
    mainImage: "images/products/Classic Matcha Tee.jpg",
    gallery:["images/products/Classic Matcha Tee.jpg","images/products/Classic Matcha Tee 1.jpg", "images/products/Classic Matcha Tee 2.jpg", "images/products/Classic Matcha Tee 3.jpg"],
    sizes:["XS", "S", "M", "L", "XL"],
    categories: ["Men", "T-Shirts"],
    description: "A premium 100% organic cotton tee in our signature Matcha colorway. Relaxed fit.",
    trending: true, bestSelling: true, newArrival: false,
    stockStatus: "In Stock", badge: "Trending"
  },
  {
    id: 102,
    name: "Dusty Rose Oversized Top",
    price: 54.99,
    mainImage: "images/products/Dusty Rose Oversized Top.jpg",
    gallery:["images/products/Dusty Rose Oversized Top.jpg","images/products/Dusty Rose Oversized Top 1.jpg", "images/products/Dusty Rose Oversized Top 2.jpg", "images/products/Dusty Rose Oversized Top 3.jpg"],
    sizes:["XS", "S", "M", "L"],
    categories: ["Women", "Tops"],
    description: "An effortless oversized silhouette in muted Dusty Rose.",
    trending: true, bestSelling: false, newArrival: true,
    stockStatus: "Limited Stock", badge: "New"
  },
  {
    id: 103,
    name: "Linen Wide-Leg Trousers",
    price: 89.99,
    mainImage: "images/products/Linen Wide-Leg Trousers.jpg",
    gallery:["images/products/Linen Wide-Leg Trousers.jpg", "images/products/Linen Wide-Leg Trousers 1.jpg", "images/products/Linen Wide-Leg Trousers 2.jpg"],
    sizes: ["XS", "S", "M", "L", "XL"],
    categories:["Women", "Bottoms"],
    description: "Relaxed wide-leg trousers in a natural linen-viscose blend.",
    trending: true, bestSelling: true, newArrival: false,
    stockStatus: "In Stock", badge: ""
  },
  {
    id: 104,
    name: "Minimal Zip Jacket",
    price: 129.99,
    mainImage: "images/products/Minimal Zip Jacket.jpg",
    gallery:["images/products/Minimal Zip Jacket.jpg","images/products/Minimal Zip Jacket 1.jpg", "images/products/Minimal Zip Jacket 2.jpg"],
    sizes:["S", "M", "L", "XL", "XXL"],
    categories: ["Men", "Outerwear"],
    description: "A clean, unlined zip jacket in a structured ponte fabric.",
    trending: true, bestSelling: false, newArrival: false,
    stockStatus: "In Stock", badge: ""
  },
  {
    id: 105,
    name: "Essential Ribbed Tank",
    price: 29.99,
    mainImage: "images/products/Essential Ribbed Tank.jpg",
    gallery:["images/products/Essential Ribbed Tank.jpg","images/products/Essential Ribbed Tank 1.jpg"],
    sizes: ["XS", "S", "M", "L"],
    categories: ["Women", "Tops"],
    description: "A wardrobe staple. Fine-rib cotton tank with a scoop neck.",
    trending: true, bestSelling: true, newArrival: false,
    stockStatus: "Out of Stock", badge: "Sold Out"
  },
  {
    id: 106,
    name: "Relaxed Cargo Pant",
    price: 99.99,
    mainImage: "images/products/Relaxed Cargo Pant.jpg",
    gallery:["images/products/Relaxed Cargo Pant.jpg","images/products/Relaxed Cargo Pant 1.jpg"],
    sizes: ["S", "M", "L", "XL"],
    categories: ["Men", "Bottoms"],
    description: "A contemporary take on the utility pant.",
    trending: true, bestSelling: false, newArrival: true,
    stockStatus: "In Stock", badge: "New"
  },
  {
    id: 107,
    name: "Washed Canvas Cap",
    price: 34.99,
    mainImage: "images/products/Washed Canvas Cap.jpg",
    gallery: ["images/products/Washed Canvas Cap.jpg","images/products/Washed Canvas Cap 1.jpg"],
    sizes: ["One Size"],
    categories: ["Men", "Women", "Accessories"],
    description: "A six-panel cap in washed canvas.",
    trending: true, bestSelling: false, newArrival: false,
    stockStatus: "In Stock", badge: ""
  },
  {
    id: 108,
    name: "Open-Knit Cardigan",
    price: 114.99,
    mainImage: "images/products/Open-Knit Cardigan.jpg",
    gallery: ["images/products/Open-Knit Cardigan.jpg","images/products/Open-Knit Cardigan 1.jpg"],
    sizes:["XS", "S", "M", "L"],
    categories: ["Women", "Tops", "Outerwear"],
    description: "An open-stitch cardigan knit from a cotton-linen blend.",
    trending: true, bestSelling: false, newArrival: false,
    stockStatus: "Limited Stock", badge: "Sale"
  },

  /* ─── STANDARD ITEMS ─────────────────────────────────── */
  { id: 109, name: "Slim Chino", price: 79.99, mainImage: "images/products/Slim Chino.jpg", gallery: ["images/products/Slim Chino.jpg","images/products/Slim Chino 1.jpg"], sizes: ["30", "32", "34"], categories:["Men", "Bottoms"], description: "A streamlined chino cut close through the thigh.", trending: false, bestSelling: true, newArrival: false, stockStatus: "In Stock", badge: "" },
  { id: 110, name: "Boxy Linen Shirt", price: 69.99, mainImage: "images/products/Boxy Linen Shirt.jpg", gallery: ["images/products/Boxy Linen Shirt.jpg","images/products/Boxy Linen Shirt 1.jpg"], sizes: ["S", "M", "L"], categories:["Men", "Women", "Tops"], description: "A boxy, relaxed-fit shirt in 100% French linen.", trending: false, bestSelling: false, newArrival: false, stockStatus: "In Stock", badge: "" },
  { id: 111, name: "Crossbody Utility Bag", price: 59.99, mainImage: "images/products/Crossbody Utility Bag.jpg", gallery: ["images/products/Crossbody Utility Bag.jpg","images/products/Crossbody Utility Bag 1.jpg"], sizes: ["One Size"], categories: ["Men", "Women", "Accessories"], description: "A compact crossbody in recycled nylon.", trending: false, bestSelling: false, newArrival: false, stockStatus: "In Stock", badge: "" },
  { id: 112, name: "Fitted Merino Crewneck", price: 109.99, mainImage: "images/products/Fitted Merino Crewneck.jpg", gallery: ["images/products/Fitted Merino Crewneck.jpg","images/products/Fitted Merino Crewneck 1.jpg"], sizes: ["S", "M", "L"], categories:["Men", "Women", "Tops"], description: "A fine-gauge merino wool crewneck.", trending: false, bestSelling: true, newArrival: false, stockStatus: "In Stock", badge: "" },
  
  /* Auto-fill variations to meet the 28 products grid requirement */
  { id: 113, name: "Everyday Denim", price: 89.99, mainImage: "images/products/Everyday Denim.jpg", gallery: ["images/products/Everyday Denim.jpg","images/products/Everyday Denim 1.jpg"], sizes: ["28", "30", "32"], categories:["Men", "Bottoms"], description: "Classic straight-leg denim.", trending: false, bestSelling: false, newArrival: true, stockStatus: "In Stock", badge: "New" },
  { id: 114, name: "Silk Slip Dress", price: 149.99, mainImage: "images/products/Silk Slip Dress.jpg", gallery: ["images/products/Silk Slip Dress.jpg","images/products/Silk Slip Dress 1.jpg"], sizes: ["XS", "S", "M"], categories:["Women", "Bottoms"], description: "Elegant silk slip dress.", trending: false, bestSelling: false, newArrival: false, stockStatus: "Limited Stock", badge: "" },
  { id: 115, name: "Cotton Blend Shorts", price: 45.99, mainImage: "images/products/Cotton Blend Shorts.jpg", gallery: ["images/products/Cotton Blend Shorts.jpg","images/products/Cotton Blend Shorts.jpg"], sizes: ["S", "M", "L"], categories: ["Men", "Bottoms"], description: "Perfect summer shorts.", trending: false, bestSelling: false, newArrival: false, stockStatus: "In Stock", badge: "" },
  { id: 116, name: "Cashmere Wrap", price: 199.99, mainImage: "images/products/Cashmere Wrap.jpg", gallery:["images/products/Cashmere Wrap.jpg","images/products/Cashmere Wrap 1.jpg"], sizes: ["One Size"], categories: ["Women", "Accessories"], description: "Luxuriously soft wrap.", trending: false, bestSelling: true, newArrival: false, stockStatus: "In Stock", badge: "Best Seller" },
  { id: 117, name: "Heavyweight Hoodie", price: 85.00, mainImage: "images/products/Heavyweight Hoodie.jpg", gallery: ["images/products/Heavyweight Hoodie.jpg","images/products/Heavyweight Hoodie 1.jpg"], sizes:["S", "M", "L", "XL"], categories: ["Men", "Outerwear"], description: "Thick premium cotton.", trending: false, bestSelling: false, newArrival: false, stockStatus: "In Stock", badge: "" },
  { id: 118, name: "Pleated Skirt", price: 65.00, mainImage: "images/products/Pleated Skirt.jpg", gallery: ["images/products/Pleated Skirt.jpg","images/products/Pleated Skirt 1.jpg"], sizes:["S", "M"], categories: ["Women", "Bottoms"], description: "Mid-length pleated skirt.", trending: false, bestSelling: false, newArrival: false, stockStatus: "Out of Stock", badge: "" },
  { id: 119, name: "Textured Beanie", price: 25.00, mainImage: "images/products/Textured Beanie.jpg", gallery: ["images/products/Textured Beanie.jpg","images/products/Textured Beanie 1.jpg"], sizes: ["One Size"], categories:["Accessories"], description: "Ribbed knit beanie.", trending: false, bestSelling: true, newArrival: false, stockStatus: "In Stock", badge: "" },
  { id: 120, name: "Linen Blazer", price: 155.00, mainImage: "images/products/Linen Blazer.jpg", gallery: ["images/products/Linen Blazer.jpg","images/products/Linen Blazer 1.jpg"], sizes: ["S", "M", "L"], categories:["Men", "Women", "Outerwear"], description: "Lightweight structured blazer.", trending: false, bestSelling: false, newArrival: true, stockStatus: "In Stock", badge: "New" },
  { id: 121, name: "Basic Pocket Tee", price: 25.99, mainImage: "images/products/Basic Pocket Tee.jpg", gallery: ["images/products/Basic Pocket Tee.jpg","images/products/Basic Pocket Tee 1.jpg"], sizes: ["S", "M", "L"], categories: ["Men", "T-Shirts"], description: "Soft pocket t-shirt.", trending: false, bestSelling: false, newArrival: false, stockStatus: "In Stock", badge: "" },
  { id: 122, name: "Turtleneck Sweater", price: 95.00, mainImage: "images/products/Turtleneck Sweater.jpg", gallery:["images/products/Turtleneck Sweater.jpg","images/products/Turtleneck Sweater 1.jpg"], sizes: ["S", "M", "L"], categories: ["Women", "Tops"], description: "Cozy knit turtleneck.", trending: false, bestSelling: false, newArrival: false, stockStatus: "Limited Stock", badge: "" },
  { id: 123, name: "Leather Belt", price: 45.00, mainImage: "images/products/Leather Belt.jpg", gallery:["images/products/Leather Belt.jpg","images/products/Leather Belt 1.jpg"], sizes: ["M", "L"], categories: ["Accessories"], description: "Full grain leather.", trending: false, bestSelling: false, newArrival: false, stockStatus: "In Stock", badge: "" },
  { id: 124, name: "Canvas Tote", price: 35.00, mainImage: "images/products/Canvas Tote.jpg", gallery: ["images/products/Canvas Tote.jpg","images/products/Canvas Tote 1.jpg"], sizes: ["One Size"], categories: ["Accessories"], description: "Heavy duty shopper.", trending: false, bestSelling: true, newArrival: false, stockStatus: "In Stock", badge: "Trending" },
  { id: 125, name: "Puffer Vest", price: 115.00, mainImage: "images/products/Puffer Vest.jpg", gallery:["images/products/Puffer Vest.jpg","images/products/Puffer Vest 1.jpg"], sizes: ["S", "M", "L"], categories: ["Men", "Outerwear"], description: "Warm insulated vest.", trending: false, bestSelling: false, newArrival: true, stockStatus: "In Stock", badge: "New" },
  { id: 126, name: "Lounge Joggers", price: 55.00, mainImage: "images/products/Lounge Joggers.jpg", gallery:["images/products/Lounge Joggers.jpg","images/products/Lounge Joggers 1.jpg"], sizes: ["S", "M", "L"], categories: ["Men", "Women", "Bottoms"], description: "Fleece lined sweatpants.", trending: false, bestSelling: true, newArrival: false, stockStatus: "In Stock", badge: "" },
  { id: 127, name: "Silk Scarf", price: 40.00, mainImage: "images/products/Silk Scarf.jpg", gallery:["images/products/Silk Scarf.jpg","images/products/Silk Scarf 1.jpg"], sizes: ["One Size"], categories: ["Accessories"], description: "Printed silk neck scarf.", trending: false, bestSelling: false, newArrival: false, stockStatus: "Limited Stock", badge: "Sale" },
  { id: 128, name: "Classic Oxford Shirt", price: 65.00, mainImage: "images/products/Classic Oxford Shirt.jpg", gallery: ["images/products/Classic Oxford Shirt.jpg","images/products/Classic Oxford Shirt 1.jpg"], sizes:["S", "M", "L", "XL"], categories: ["Men", "Tops"], description: "Crisp button down.", trending: false, bestSelling: true, newArrival: false, stockStatus: "In Stock", badge: "" }
];

export default products;