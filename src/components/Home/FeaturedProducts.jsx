const FeaturedProducts = () => {
    const products = [
      {
        id: 1,
        name: "Product 1",
        price: "$100",
        image: "https://via.placeholder.com/200x200?text=Product+1",
      },
      {
        id: 2,
        name: "Product 2",
        price: "$120",
        image: "https://via.placeholder.com/200x200?text=Product+2",
      },
      {
        id: 3,
        name: "Product 3",
        price: "$150",
        image: "https://via.placeholder.com/200x200?text=Product+3",
      },
      {
        id: 4,
        name: "Product 4",
        price: "$200",
        image: "https://via.placeholder.com/200x200?text=Product+4",
      },
      {
        id: 5,
        name: "Product 5",
        price: "$180",
        image: "https://via.placeholder.com/200x200?text=Product+5",
      },
      {
        id: 6,
        name: "Product 6",
        price: "$90",
        image: "https://via.placeholder.com/200x200?text=Product+6",
      },
    ];
  
    return (
     <div className="py-20">
        <h1 className="text-center font-bold text-4xl">Our Products</h1>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8 py-12  ">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center">
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-600">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
     </div>
    );
  };
  
  export default FeaturedProducts;
  