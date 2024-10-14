import { Card, Carousel } from "flowbite-react";
import "../../public/styles/home.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../Common/styles/home.scss";
import { API_PRODUCT } from "../../Common/const/api.const";

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
            <div className="h-96 sm:h-96 xl:h-96 2xl:h-96">
                <Carousel>
                    <img src="https://i.imgur.com/0seEOc0.jpeg" alt="Banner ao" />
                    <img src="https://i.imgur.com/Km7NBA2.jpeg" alt="Banner ao" />
                    <img src="https://i.imgur.com/Rauojq1.jpeg" alt="Banner ao" />
                    <img src="https://i.imgur.com/fbXLHEy.jpeg" alt="Banner ao" />
                    <img src="https://i.imgur.com/e9ifEOR.jpeg" alt="Banner ao" />
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
                                to="https://www.tiktok.com/@phuongthanhsport"
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

            <div class="group fixed bottom-0 right-0 p-2  flex items-end justify-end w-24 h-24 ">
                <div class="text-white shadow-xl flex items-center justify-center p-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 z-50 absolute  ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 group-hover:rotate-90 transition  transition-all duration-[0.6s]">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>
                <div class="absolute rounded-full transition-all duration-[0.2s] ease-out scale-y-0 group-hover:scale-y-100 group-hover:-translate-x-16   flex  p-2 hover:p-3 bg-green-300 scale-100 hover:bg-green-400 text-white">
                    <Link to="https://www.facebook.com/thoitrangthethaoali">
                        <svg class="w-10 h-10 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z" clip-rule="evenodd" />
                        </svg>
                    </Link>
                </div>

                <div class="absolute rounded-full transition-all duration-[0.2s] ease-out scale-x-0 group-hover:scale-x-100 group-hover:-translate-y-14 group-hover:-translate-x-14   flex  p-2 hover:p-3 bg-yellow-300 hover:bg-yellow-400 text-white">
                    <Link to="https://www.tiktok.com/@phuongthanhsport">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-10 h-10"
                            viewBox="0 0 100 100"
                            fill="currentColor"
                        >
                            <path
                                d="M 31 17 C 23.27961 17 17 23.27961 17 31 L 17 69 C 17 76.72039 23.27961 83 31 83 L 69 83 C 76.72039 83 83 76.72039 83 69 L 83 31 C 83 23.27961 76.72039 17 69 17 L 31 17 z M 31 19 L 69 19 C 75.63961 19 81 24.36039 81 31 L 81 69 C 81 75.63961 75.63961 81 69 81 L 31 81 C 24.36039 81 19 75.63961 19 69 L 19 31 C 19 24.36039 24.36039 19 31 19 z M 33.5 22 C 27.154767 22 22 27.154767 22 33.5 A 0.50005 0.50005 0 1 0 23 33.5 C 23 27.695233 27.695233 23 33.5 23 L 36.5 23 A 0.50005 0.50005 0 1 0 36.5 22 L 33.5 22 z M 49.5 26 A 0.50005 0.50005 0 0 0 49 26.5 L 49 40.5 L 49 45.394531 L 49 57.5 C 49 61.087773 46.088756 64 42.5 64 C 41.817522 64 41.16108 63.892525 40.542969 63.697266 C 39.582138 62.564083 39 61.100903 39 59.5 C 39 55.912227 41.911244 53 45.5 53 C 45.813529 53 46.122337 53.025483 46.427734 53.070312 A 0.50005 0.50005 0 0 0 47 52.574219 L 47 45.537109 A 0.50005 0.50005 0 0 0 46.537109 45.039062 C 46.194864 45.013135 45.849859 45 45.5 45 C 44.993719 45 44.493103 45.027152 44 45.078125 L 44 43.537109 A 0.50005 0.50005 0 0 0 43.537109 43.039062 C 43.194864 43.013135 42.849859 43 42.5 43 C 34.508843 43 28 49.508843 28 57.5 C 28 63.167219 31.280845 68.075682 36.035156 70.458984 C 38.578458 72.658908 41.883826 74 45.5 74 C 53.491157 74 60 67.491157 60 59.5 L 60 43.208984 C 63.936751 45.978698 68.414189 47 71.5 47 A 0.50005 0.50005 0 0 0 72 46.5 L 72 39.5 A 0.50005 0.50005 0 0 0 71.5 39 C 71.396906 39 70.379404 38.984789 69 38.667969 L 69 37.5 A 0.50005 0.50005 0 0 0 68.5 37 C 68.340213 37 65.994199 36.952927 63.484375 35.808594 C 61.835154 34.258786 60.462627 31.9597 60.025391 28.4375 A 0.50005 0.50005 0 0 0 59.529297 28 L 57.302734 28 C 57.191022 27.505201 57.093955 26.989824 57.025391 26.4375 A 0.50005 0.50005 0 0 0 56.529297 26 L 49.5 26 z M 50 27 L 56.140625 27 C 56.193065 27.343629 56.254649 27.676708 56.324219 28 L 52.5 28 A 0.50005 0.50005 0 0 0 52 28.5 L 52 42.5 L 52 47.394531 L 52 59.5 C 52 63.087773 49.088756 66 45.5 66 C 44.213198 66 43.017425 65.62034 42.007812 64.974609 C 42.171174 64.985321 42.334008 65 42.5 65 C 46.631244 65 50 61.630227 50 57.5 L 50 45.394531 L 50 40.5 L 50 27 z M 53 29 L 56.576172 29 C 57.724394 33.008933 60.211877 35.305934 62.630859 36.521484 C 62.763811 36.588293 62.89094 36.638554 63.021484 36.699219 C 63.857016 37.465184 64.744788 38.076229 65.630859 38.521484 C 66.481728 38.94905 67.279027 39.240151 68 39.449219 L 68 43.917969 C 64.928876 43.826351 60.524737 42.821132 56.808594 39.908203 A 0.50005 0.50005 0 0 0 56 40.302734 L 56 57.5 C 56 64.948843 49.948843 71 42.5 71 C 40.380323 71 38.381788 70.495825 36.595703 69.623047 C 33.78481 67.148001 32 63.534459 32 59.5 C 32 52.906268 36.744618 47.41773 43 46.242188 L 43 50.037109 C 42.833003 50.025162 42.67088 50 42.5 50 C 38.368756 50 35 53.369773 35 57.5 C 35 60.745018 37.083549 63.512036 39.978516 64.552734 C 41.351303 66.051443 43.315425 67 45.5 67 C 49.631244 67 53 63.630227 53 59.5 L 53 47.394531 L 53 42.5 L 53 29 z M 57.5625 29 L 59.140625 29 C 59.471279 31.166712 60.166524 32.90471 61.050781 34.320312 C 59.606081 33.150405 58.312861 31.466753 57.5625 29 z M 66.380859 37.763672 C 67.097339 37.88732 67.687583 37.938137 68 37.949219 L 68 38.396484 C 67.482183 38.235629 66.93348 38.021976 66.380859 37.763672 z M 69 39.703125 C 69.921455 39.894109 70.629275 39.936069 71 39.949219 L 71 45.917969 C 69.054968 45.396836 66.80523 43.928079 66.380859 42.185547 A 0.50005 0.50005 0 0 0 65.851562 41.759766 C 66.572585 40.917586 67.502192 40.101836 68 39.703125 z M 62 37 L 62 43.537109 A 0.50005 0.50005 0 0 0 62.5 44 C 63.169139 44 63.5 43.329139 63.5 42.5 L 63.5 36 A 0.50005 0.50005 0 0 0 63 35.5 C 62.330861 35.5 62 36.170861 62 37 z M 63.5 26 A 0.50005 0.50005 0 0 0 63 26.5 L 63 30.5 A 0.50005 0.50005 0 0 0 64 30.5 C 64.5 30.5 64 30.5 64 30.5 L 64 27.5 A 0.50005 0.50005 0 0 0 63.5 27.5 A 0.50005 0.50005 0 0 0 63.5 26 z"
                            />
                        </svg></Link>

                </div>
            </div>
        </>
    );
};

export default Home;
