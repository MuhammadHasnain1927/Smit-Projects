"use client";

function App() {
  const products = [
    { id: 101, title: "Apple iPhone 15", price: 285000, status: true },
    { id: 102, title: "Samsung Galaxy S24", price: 245000, status: true },
    { id: 103, title: "Dell XPS 13 Laptop", price: 395000, status: false },
    {
      id: 104,
      title: "Sony WH-1000XM5 Headphones",
      price: 98000,
      status: true,
    },
    { id: 105, title: "Apple Watch Series 9", price: 145000, status: true },
    { id: 106, title: "LG 55-inch 4K Smart TV", price: 210000, status: false },
    { id: 107, title: "Canon EOS R50 Camera", price: 235000, status: true },
    {
      id: 108,
      title: "Logitech MX Master 3S Mouse",
      price: 32000,
      status: true,
    },
  ];

  const lowToHigh = [...products].sort((a, b) => a.price - b.price);

  const above45000 = products
    .filter((product) => product.price > 45000)
    .sort((a, b) => b.price - a.price);

  const increasedPrices = products.map((product) => ({
    ...product,
    price: product.price * 1.1,
  }));

  const startsWithA = products.filter((product) =>
    product.title.toLowerCase().startsWith("a"),
  );

  const top3 = [...products].sort((a, b) => b.price - a.price).slice(0, 3);

  const total = products.reduce((sum, product) => sum + product.price, 0);

  const average = total / products.length;

  const averageProducts = products.map((product) => ({
    ...product,
    priceLabel: product.price < average ? "Below average" : "Above average",
  }));

  return (
    <div>
      <h1>Products Assignment</h1>

      <h2>1. Low to High</h2>
      {lowToHigh.map((product) => (
        <p key={product.id}>
          {product.title} - Rs. {product.price}
        </p>
      ))}

      <h2>2. Above 45000 - High to Low</h2>
      {above45000.map((product) => (
        <p key={product.id}>
          {product.title} - Rs. {product.price}
        </p>
      ))}

      <h2>3. Prices Increased by 10%</h2>
      {increasedPrices.map((product) => (
        <p key={product.id}>
          {product.title} - Rs. {product.price}
        </p>
      ))}

      <h2>4. Names Starting With A</h2>
      {startsWithA.map((product) => (
        <p key={product.id}>
          {product.title} - Rs. {product.price}
        </p>
      ))}

      <h2>5. Top 3 Most Expensive</h2>
      {top3.map((product) => (
        <p key={product.id}>
          {product.title} - Rs. {product.price}
        </p>
      ))}

      <h2>6. Average Price: Rs. {average}</h2>
      {averageProducts.map((product) => (
        <p key={product.id}>
          {product.title} - Rs. {product.price} ({product.priceLabel})
        </p>
      ))}
    </div>
  );
}

export default App;
