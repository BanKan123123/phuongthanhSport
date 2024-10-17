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
                        <Card
                            key={product.id}
                            className="flowbite-card h-full flex flex-col p-4 sm:p-6 rounded-lg shadow-lg bg-gray-50 dark:bg-gray-700 hover:shadow-xl transition-shadow duration-300"
                            imgAlt={product.name}
                            imgSrc={product.images[0]}
                        >
                            <Link to={`/home/product/detail/${product.id}`}>
                                <h5 className="text-base sm:text-lg font-bold tracking-tight text-gray-900 dark:text-white truncate">
                                    {product.name}
                                </h5>
                            </Link>

                            <div className="mt-2 flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className="h-4 w-4 text-yellow-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">5.0</span>
                            </div>

                            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between">
                                <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{product.price} VND</span>
                            </div>

                            <Link
                                to="https://www.facebook.com/profile.php?id=61566847335730&is_tour_dismissed"
                                className="mt-4 w-full sm:w-auto text-center rounded-md bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                            >
                                Thêm vào giỏ hàng
                            </Link>
                        </Card>
                    ))}
                </div>
            </section>

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
                            <Card imgAlt="Vision Image" imgSrc={images.vision} className="card shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <h2 className="text-2xl font-semibold mb-4 text-cyan-600">Tầm nhìn</h2>
                                <p className="text-lg text-gray-700">
                                    Phương Thanh Sport hướng đến trở thành đơn vị dẫn đầu cả nước trong lĩnh vực thể thao,
                                    góp phần nâng cao sức khỏe cộng đồng và thúc đẩy phong trào thể thao trong mọi lứa tuổi.
                                </p>
                            </Card>
                        </div>

                        {/* Mission */}
                        <div className="mb-12">
                            <Card imgAlt="Mission Image" imgSrc={images.mission} className="card shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <h2 className="text-2xl font-semibold mb-4 text-cyan-600">Sứ mệnh</h2>
                                <p className="text-lg text-gray-700">
                                    Mang đến cho khách hàng những sản phẩm chất lượng cao và dịch vụ chăm sóc tận tâm,
                                    giúp mỗi người chơi cầu lông phát huy tối đa tiềm năng và đam mê.
                                </p>
                            </Card>
                        </div>

                        {/* Core Values */}
                        <div className="mb-12 md:col-span-2">
                            <Card imgAlt="Core Values Image" imgSrc={images.values} className="card shadow-lg hover:shadow-xl transition-shadow duration-300">
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
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Liên hệ của chúng tôi</h2>
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
