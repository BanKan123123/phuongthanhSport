import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Carousel, Button, Card, Select } from "flowbite-react";
import ProductComponent from "../product.component";
import { API_PRODUCT } from "../../../Common/const/api.const";

const DetailProduct = () => {
    const [product, setProduct] = useState(null);
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const { id } = useParams();

    useEffect(() => {
        const fetchDataProductByMa = async () => {
            try {
                const response = await axios.get(`${API_PRODUCT}/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        };
        fetchDataProductByMa();
    }, [id]);

    // List of random colors
    return (
        <>
            {product ? (
                <section className="bg-gray-50 py-12">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Carousel for Product Images */}
                            <div className="lg:w-1/2">
                                <Carousel slide={true}>
                                    {product.images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            alt={product.name}
                                            className="object-cover object-center w-full h-96 rounded-lg"
                                        />
                                    ))}
                                </Carousel>
                            </div>
                            {/* Product Details */}
                            <div className="lg:w-1/2">
                                <div className="flex flex-col gap-4">
                                    <h1 className="text-3xl font-bold text-gray-900">
                                        {product.name}
                                    </h1>
                                    <div className="flex items-center gap-3">
                                        <span className="text-lg font-semibold text-gray-600">
                                            {product.price} VND
                                        </span>
                                        <span className="text-sm text-gray-500">(4 reviews)</span>
                                    </div>

                                    {/* Color & Size Selector */}
                                    <div className="flex gap-4 mt-4">
                                        {/* Select Color */}
                                        <div>
                                            <span className="text-sm text-gray-700">Color:</span>
                                            <Select
                                                onChange={(e) => setSelectedColor(e.target.value)}
                                                defaultValue="Choose a color"
                                                className="mt-1"
                                            >
                                                <option disabled>Choose a color</option>
                                                {product.colours.map((color, index) => (
                                                    <option key={index} value={color}>
                                                        {color}
                                                    </option>
                                                ))}
                                            </Select>

                                            {/* Show selected color */}
                                            {selectedColor && (
                                                <div
                                                    className="w-6 h-6 mt-2 rounded-full border-2 border-gray-300"
                                                    style={{ backgroundColor: selectedColor }}
                                                ></div>
                                            )}
                                        </div>

                                        {/* Select Size */}
                                        <div>
                                            <span className="text-sm text-gray-700">Size:</span>
                                            <Select
                                                onChange={(e) => setSelectedSize(e.target.value)}
                                                defaultValue="Choose a size"
                                                className="mt-1"
                                            >
                                                <option disabled>Choose a size</option>
                                                {product.size.map((size, index) => (
                                                    <option key={index} value={size}>
                                                        {size}
                                                    </option>
                                                ))}
                                            </Select>
                                        </div>
                                    </div>

                                    {/* Product Description */}
                                    <div className="mt-6">
                                        <h2 className="text-lg font-semibold text-gray-900">Description:</h2>
                                        <p className="text-gray-700 leading-relaxed mt-2">
                                            {product.description}
                                        </p>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center gap-4 mt-6">
                                        <Button gradientDuoTone="pinkToOrange" pill>
                                            Add to Cart
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Product Data Section */}
                        <div className="mt-12">
                            <Card>
                                <h2 className="text-2xl font-bold text-gray-900">Additional Product Information</h2>
                                <p className="text-gray-700 leading-relaxed mt-4">{product.data}</p>
                            </Card>
                        </div>
                    </div>
                </section>
            ) : (
                <div className="container mx-auto mt-20">
                    <p className="text-center text-gray-600">Loading product details...</p>
                </div>
            )}
            <ProductComponent />
        </>
    );
};

export default DetailProduct;
