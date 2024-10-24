import { Card, Carousel } from "flowbite-react";
import "../../public/styles/home.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../Common/styles/home.scss";
import { API_PRODUCT } from "../../Common/const/api.const";
import FloatButton from "../../Common/float-button.common";

const Home = () => {
    const [products, setProduct] = useState([]);

    const [images, setImages] = useState({
        vision: 'https://maisonoffice.vn/wp-content/uploads/2023/11/1-vai-tro-cua-tam-nhin-va-su-menh.jpg',
        mission: 'https://jobsgo.vn/blog/wp-content/uploads/2022/08/su-menh-cua-doanh-nghiep.jpg',
        values: 'https://mondial.vn/wp-content/uploads/2023/07/gia_tri_cot_loi_thuong_hieu_khong_thay_doi_theo_thoi_gian.jpg',
    });

    useEffect(() => {
        const fetchDataProducts = async () => {
            try {
                const response = await axios.get(API_PRODUCT);
                setProduct(response.data);
            } catch (error) {
                console.error(error.message);
            }
        }
        fetchDataProducts();
    }, [])

    return (
        <>
            <div className="h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px]">
                <Carousel>
                    <img
                        src="https://i.imgur.com/JqSvVhM.jpeg"
                        alt="Banner ao"
                        className="w-full h-full object-cover object-center"
                    />
                    <img
                        src="https://i.imgur.com/o8Y9xwJ.jpeg"
                        alt="Banner ao"
                        className="w-full h-full object-cover object-center"
                    />
                    <img
                        src="https://i.imgur.com/k2tzJG6.jpeg"
                        alt="Banner ao"
                        className="w-full h-full object-cover object-center"
                    />
                </Carousel>
            </div>

            <section className="main">
                <h1 className="text-2xl sm:text-3xl font-bold text-center my-4">Danh sách sản phẩm</h1>

                <div className="list-products grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 justify-center rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 p-4 sm:p-6 lg:p-8">
                    {products.map(product => (
                        <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 w-full h-full flex flex-col">
                            <Link to = {`/home/product/detail/${product.id}`} className="w-full h-96 overflow-hidden">
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="w-full h-full object-contain"
                                />
                            </Link>
                            <div className="p-4 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="mt-2 text-lg font-semibold text-gray-800">{product.name}</h3>
                                    <p className="mt-1 text-lg font-medium text-gray-900">{product.price} VND</p>
                                </div>
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
                            <Link
                                to="https://www.facebook.com/profile.php?id=61566847335730&is_tour_dismissed"
                                className="mt-4 w-full sm:w-auto text-center rounded-md bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                            >
                                Thêm vào giỏ hàng
                            </Link>
                        </div>
                    ))}
                </div>
            </section >

            <section className="about bg-gray-100 py-10">
                <div className="container mx-auto">
                    <h1 className="text-4xl font-bold text-center mb-10 text-cyan-600">Giới thiệu Phương Thanh Sport</h1>

                    <p className="text-center mb-8 text-lg text-gray-700">
                        Chào mừng bạn đến với Phương Thanh Sport – điểm đến uy tín cho các tín đồ cầu lông.
                        Chúng tôi chuyên cung cấp các sản phẩm quần áo và phụ kiện cầu lông từ những thương hiệu hàng đầu thế giới như Yonex, Lining. Với mục tiêu mang đến cho khách hàng những trải nghiệm tốt nhất, chúng tôi luôn cam kết về chất lượng sản phẩm và dịch vụ chuyên nghiệp.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Vision */}
                        <div className="mb-12">
                            <Card imgAlt="Vision Image" className="card shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <h2 className="text-2xl font-semibold mb-4 text-cyan-600">Tầm nhìn</h2>
                                <p className="text-lg text-gray-700">
                                    Phương Thanh Sport hướng đến trở thành đơn vị dẫn đầu cả nước trong lĩnh vực thể thao,
                                    góp phần nâng cao sức khỏe cộng đồng và thúc đẩy phong trào thể thao trong mọi lứa tuổi.
                                </p>
                            </Card>
                        </div>

                        {/* Mission */}
                        <div className="mb-12">
                            <Card imgAlt="Mission Image" className="card shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <h2 className="text-2xl font-semibold mb-4 text-cyan-600">Sứ mệnh</h2>
                                <p className="text-lg text-gray-700">
                                    Mang đến cho khách hàng những sản phẩm chất lượng cao và dịch vụ chăm sóc tận tâm,
                                    giúp mỗi người chơi cầu lông phát huy tối đa tiềm năng và đam mê.
                                </p>
                            </Card>
                        </div>

                        {/* Core Values */}
                        <div className="mb-12 md:col-span-2">
                            <Card imgAlt="Core Values Image" className="card shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <h2 className="text-2xl font-semibold mb-4 text-cyan-600">Giá trị cốt lõi</h2>
                                <ul className="list-disc list-inside text-lg text-gray-700">
                                    <li className="mb-2">Chất lượng: Cam kết cung cấp sản phẩm tốt nhất từ các thương hiệu uy tín.</li>
                                    <li className="mb-2">Uy tín: Đặt lợi ích khách hàng lên hàng đầu, tạo dựng niềm tin lâu dài.</li>
                                    <li>Đam mê thể thao: Luôn đồng hành cùng cộng đồng yêu thích cầu lông, tạo nên môi trường thể thao năng động và tích cực.</li>
                                </ul>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>


            <section className="bg-white dark:bg-gray-900">
                <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                    <h2 className="mb-4 text-4xl tracking-tight font-inter text-center text-gray-900 dark:text-white">Liên hệ của chúng tôi</h2>
                    <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Có một vấn đề kỹ thuật? Bạn muốn gửi phản hồi về tính năng beta? Cần thông tin chi tiết về kế hoạch kinh doanh của chúng tôi? Hãy cho chúng tôi biết.</p>
                    <form action="#" className="space-y-8">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email của bạn</label>
                            <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                        </div>
                        <div>
                            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Lời nhắn của bạn</label>
                            <textarea id="message" rows={4} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Leave a comment..." required />
                        </div>
                        <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send message</button>
                    </form>
                </div>
            </section>
        </>
    );
};

export default Home;
