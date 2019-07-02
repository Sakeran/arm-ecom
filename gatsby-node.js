/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// Process the nodes from the faker plugin to add some additional data.
exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type.startsWith("ProductData")) {
    // Price
    actions.createNodeField({
      node,
      name: "price",
      value: determinePrice(node.internal.type),
    })

    // Rating (1-10)
    actions.createNodeField({
      node,
      name: "rating",
      value: 1 + Math.floor(Math.random() * 10),
    })

    // Image (1-5) - We'll have five sample images per product category
    actions.createNodeField({
      node,
      name: "imageID",
      value:  1 + Math.floor(Math.random() * 5),
    })

    // Product Name
    // The faker data gives us product names with three words.
    // For whatever reason, products with two words sound
    // more tech-y (by a very loose standard),
    // so we'll just pick out two at random.
    const leaveOut = Math.floor(Math.random() * 3)
    const name = node.commerce.productName
      .split(" ")
      .map((w, i) => (i !== leaveOut ? w : ""))
      .filter(w => !!w)
      .join(" ")

    actions.createNodeField({
      node,
      name: "productName",
      value: name,
    })
  }
}

// Determine a dollar price based on the type of product.
// Limit to increments of 50, - 1
// Laptops - 399-1599
// Phones - 199-999
// Cameras - 59 - 399
// Watches - 49 - 200
function determinePrice(nodeType) {
  function minMaxBy50s(min, max) {
    const fMin = Math.floor(min / 50)
    const fMax = Math.floor(max / 50)
    return (fMin + Math.floor(Math.random() * (1 + fMax - fMin))) * 50
  }

  switch (nodeType) {
    case "ProductDataLaptops":
      return minMaxBy50s(400, 1600) - 1
    case "ProductDataPhones":
      return minMaxBy50s(200, 1000) - 1
    case "ProductDataCameras":
      return minMaxBy50s(50, 400) - 1
    case "ProductDataWatches":
      return minMaxBy50s(50, 200) - 1
    default:
      return 1
  }
}
