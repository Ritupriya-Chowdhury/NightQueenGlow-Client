const FeaturedProducts = () => {
    const products = [
      {
        id: 1,
        name: "Eye Shadow",
        price: "$11",
        image: "https://media.istockphoto.com/id/1160982623/photo/eye-shadow-palette-isolated-on-white-background-copy-space.jpg?s=612x612&w=0&k=20&c=Cb9Dt4AkVi-KhquJWUsbULiI-X866JbYSoaC1eGly-0=",
      },
      {
        id: 2,
        name: "Moisturizing Cream",
        price: "$23",
        image: "https://images.unsplash.com/photo-1661346378886-ff07460ed79f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D",
      },
      {
        id: 3,
        name: "Lip Gloss",
        price: "$50",
        image: "https://media.istockphoto.com/id/516636609/photo/lip-gloss.jpg?s=612x612&w=0&k=20&c=abUQ_4N_ny0BA54spgeK2tAK_7i7Qxom0gWYo6ACtfA=",
      },
      {
        id: 4,
        name: "Blush",
        price: "$27",
        image: "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 5,
        name: "Lipstick",
        price: "$29",
        image: "https://media.istockphoto.com/id/688274220/vector/3d-illustration-two-pink-and-red-lipstick.jpg?s=612x612&w=0&k=20&c=I0s2eW4KMwhH32po7z0iiK2S-LRhsbjTgLZ0VFDrhr0=",
      },
      {
        id: 6,
        name: "Foundation",
        price: "$40",
        image: "https://images.unsplash.com/photo-1557205465-f3762edea6d3?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 7,
        name: "Loose Blush",
        price: "$60",
        image: "https://kamleshyadav.com/templatemonster/beautyshop/wp-content/uploads/2019/07/cosmatic-product-3-300x300.jpg",
      },
      {
        id: 8,
        name: "Pressed Blush",
        price: "$65",
        image: "https://kamleshyadav.com/templatemonster/beautyshop/wp-content/uploads/2019/07/cosmatic-product-2-300x300.jpg",
      },
      
    ];
  
    return (
     <div className="pb-16 bg-pink-100">
        <h1 className="text-center font-bold text-4xl py-16">Our Products</h1>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 px-8   ">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition bg-white"
          >
            <div className="border-b">
            <img
              src={product.image}
              alt={product.name}
              className="w-[320px] h-[400px] mx-auto py-6 px-6  "
            />
            </div>
            <div className="p-4 text-left ">
              <h2 className="text-2xl font-semibold">{product.name}</h2>
              <p className="text-pink-500 font-semibold text-xl">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
     </div>
    );
  };
  
  export default FeaturedProducts;
  