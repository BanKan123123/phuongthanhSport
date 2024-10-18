import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../Common/styles/products.scss"; // Make sure this file exists
import { API_PRODUCT } from "../../Common/const/api.const";

const ProductComponent = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([

    ]);
    const fetchDataProducts = async () => {
        try {
            const response = await axios.get(API_PRODUCT);
            setProducts(response.data);
            setFilteredProducts(response.data); // Initialize filtered products
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchDataProducts();
    }, []);

    const handleFilterChange = (event) => {
        const category = event.target.value;
        if (category === "") {
            setFilteredProducts(products); // Reset filter
        } else {
            const filtered = filteredProducts.filter((product) => {
                return product.category.toLowerCase() === category.trim().toLowerCase()
            });
            setFilteredProducts(filtered);
        }
    };

    return (
        <div className="bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Danh sách sản phẩm</h1>

                {/* Filter Dropdown */}
                <div className="mb-4 text-center">
                    <select
                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        onChange={(e) => handleFilterChange(e)}
                    >
                        <option value="">Tất cả danh mục</option>
                        <option value="áo">Áo</option>
                        <option value="vợt">Vợt</option>
                        <option value="giày">Giày</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {filteredProducts.map((product) => (
                        <Link to={`/home/product/detail/${product.id}`} key={product.id} className="group">
                            <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 w-full">
                                <div className="w-full h-96 overflow-hidden">
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="mt-2 text-lg font-semibold text-gray-800">{product.name}</h3>
                                    <p className="mt-1 text-lg font-medium text-gray-900">{product.price} VND</p>
                                    <p className="mt-1 text-sm text-gray-600 line-clamp-3">
                                        {product.description.length > 100 ? (
                                            <>
                                                {product.description.slice(0, 100)}...{" "}
                                                <span className="text-cyan-500 cursor-pointer hover:underline">Đọc thêm</span>
                                            </>
                                        ) : (
                                            product.description
                                        )}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default ProductComponent;
