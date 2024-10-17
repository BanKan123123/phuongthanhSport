import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Carousel, Button, Card, Select, Badge } from "flowbite-react";
import ProductComponent from "../product.component";
import { API_PRODUCT } from "../../../Common/const/api.const";
import '../../../Common/styles/products.scss';

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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [product]);

    // List of random colors
    return (
        <>
            {product ? (
                <section className="bg-gray-50 py-12">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Carousel for Product Images */}
                            <div className="w-full h-auto lg:w-1/2">
                                <Carousel slide={true} className="w-full h-full">
                                    {product.images.map((image, index) => (
                                        <div key={index} className="relative w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] xl:h-[550px]">
                                            <img
                                                src={image}
                                                alt={product.name}
                                                className="object-cover object-center w-full h-full rounded-lg"
                                            />
                                        </div>
                                    ))}
                                </Carousel>
                            </div>
                            {/* Product Details */}
                            <div className="lg:w-1/2 flex flex-col">
                                <div className="flex flex-col gap-4">
                                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                                        {product.name}
                                    </h1>
                                    <Badge className = "w-[80px] text-center"><h3 className = "text-base">{product.brand}</h3></Badge>
                                    <div className="flex items-center gap-3">
                                        <span className="text-lg font-semibold text-gray-600">
                                            {product.price} VND
                                        </span>
                                        <span className="text-sm text-gray-500">(4 reviews)</span>
                                    </div>

                                    {/* Color & Size Selector */}
                                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                        {/* Select Color */}
                                        <div className="flex flex-col">
                                            <span className="text-sm text-gray-700">Màu sắc:</span>
                                            <Select
                                                onChange={(e) => setSelectedColor(e.target.value)}
                                                defaultValue="Chọn màu sắc"
                                                className="mt-1"
                                            >
                                                <option disabled>Chọn màu sắc</option>
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
                                        <div className="flex flex-col">
                                            <span className="text-sm text-gray-700">Kích thước:</span>
                                            <Select
                                                onChange={(e) => setSelectedSize(e.target.value)}
                                                defaultValue="Chọn kích thước"
                                                className="mt-1"
                                            >
                                                <option disabled>Chọn kích thước</option>
                                                {product.size.map((size, index) => (
                                                    <option key={index} value={size}>
                                                        {size}
                                                    </option>
                                                ))}
                                            </Select>
                                        </div>
                                    </div>



                                    {/* Action Buttons */}
                                    <div className="flex items-center gap-4 mt-6">
                                        <Button gradientDuoTone="pinkToOrange" pill>
                                            <Link to="https://www.facebook.com/profile.php?id=61566847335730&is_tour_dismissed">
                                                Thêm vào giỏ hàng
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Product Description */}
                        <div className="mt-6">
                            <h2 className="text-lg font-semibold text-gray-900">Mô tả:</h2>
                            <p className="text-gray-700 leading-relaxed mt-2">
                                {product.description}
                            </p>
                        </div>
                        {/* Product Data Section */}
                        <div className="mt-12">
                            <Card>
                                <h2 className="text-2xl font-bold text-gray-900">Thêm thông tin khác về sản phẩm</h2>
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
