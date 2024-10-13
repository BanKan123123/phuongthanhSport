import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../Common/styles/products.scss"; // Make sure this file exists
import { API_PRODUCT } from "../../Common/const/api.const";

const ProductComponent = () => {
    const [products, setProducts] = useState([]);
    
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        const fetchDataProducts = async () => {
            try {
                const response = await axios.get(API_PRODUCT);
                setProducts(response.data);
                setFilteredProducts(response.data); // Initialize filtered products
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchDataProducts();
    }, []);

    const handleFilterChange = (event) => {
        const category = event.target.value;
        setSelectedCategory(category);
        if (category === "") {
            setFilteredProducts(products); // Reset filter
        } else {
            const filtered = products.filter((product) => product.category === category);
            setFilteredProducts(filtered);
        }
    };

    return (
        <div className="bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">List Products</h1>

                {/* Filter Dropdown */}
                <div className="mb-4 text-center">
                    <select
                        className="border border-gray-300 rounded-lg p-2"
                        value={selectedCategory}
                        onChange={handleFilterChange}
                    >
                        <option value="">All Categories</option>
                        <option value="Áo">Áo</option>
                        <option value="Vợ">Vợ</option>
                        <option value="Giày">Giày</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {filteredProducts.map((product) => (
                        <Link to={`/home/product/detail/${product.id}`} key={product.id} className="group w-80">
                            <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 w-full">
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden">
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="mt-2 text-lg font-semibold text-gray-800">{product.name}</h3>
                                    <p className="mt-1 text-lg font-medium text-gray-900">{product.price} VND</p>
                                    <p className="mt-1 text-sm text-gray-600">{product.description}</p>
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