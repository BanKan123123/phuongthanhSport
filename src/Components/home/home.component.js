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
        vision: '../../public/images/vison.webp',
        mission: 'https://www.pexels.com/photo/mission-wooden-blocks-on-white-surface-7666429/',
        values: 'https://www.pexels.com/photo/person-holding-a-board-with-a-text-saying-we-listen-to-our-customers-7564196/',
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
                <h1> List Products</h1>

                <div className="list-products flex flex-wrap gap-6 justify-center rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
                    {products.map(product => (
                        <>
                            <Card
                                className="h-full flex-col p-8"
                                imgAlt={product.name}
                                imgSrc={product.images[0]}
                            >
                                <Link to={`/home/product/detail/${product.id}`}>
                                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                        {product.name}
                                    </h5>
                                </Link>
                                <div className="mb-5 mt-2.5 flex items-center">
                                    <svg
                                        className="h-5 w-5 text-yellow-300"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <svg
                                        className="h-5 w-5 text-yellow-300"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <svg
                                        className="h-5 w-5 text-yellow-300"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <svg
                                        className="h-5 w-5 text-yellow-300"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <svg
                                        className="h-5 w-5 text-yellow-300"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span className="ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
                                        5.0
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-3xl font-bold text-gray-900 dark:text-white">{product.price}</span>
                                    <Link
                                        href="#"
                                        className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                                    >
                                        Add to cart
                                    </Link>
                                </div>
                            </Card>
                        </>
                    ))}
                </div>

            </section>

            <section className="about">
                <h1> About</h1>

                <div className="container mx-auto">
                    <h1 className="text-4xl font-bold text-center mb-10">Giới thiệu Phương Thanh Sport</h1>

                    <p className="text-center mb-8 text-lg">
                        Chào mừng bạn đến với Phương Thanh Sport – điểm đến uy tín cho các tín đồ cầu lông.
                        Chúng tôi chuyên cung cấp các sản phẩm quần áo và phụ kiện cầu lông từ những thương hiệu hàng đầu thế giới như Yonex, Lining. Với mục tiêu mang đến cho khách hàng những trải nghiệm tốt nhất, chúng tôi luôn cam kết về chất lượng sản phẩm và dịch vụ chuyên nghiệp.
                    </p>

                    {/* Vision */}
                    <div className="mb-12">
                        <Card imgAlt="Vision Image" imgSrc={images.vision}>
                            <h2 className="text-2xl font-semibold mb-4">Tầm nhìn</h2>
                            <p className="text-lg">
                                Phương Thanh Sport hướng đến trở thành đơn vị dẫn đầu cả nước trong lĩnh vực thể thao,
                                góp phần nâng cao sức khỏe cộng đồng và thúc đẩy phong trào thể thao trong mọi lứa tuổi.
                            </p>
                        </Card>
                    </div>

                    {/* Mission */}
                    <div className="mb-12">
                        <Card imgAlt="Mission Image" imgSrc={images.mission}>
                            <h2 className="text-2xl font-semibold mb-4">Sứ mệnh</h2>
                            <p className="text-lg">
                                Mang đến cho khách hàng những sản phẩm chất lượng cao và dịch vụ chăm sóc tận tâm,
                                giúp mỗi người chơi cầu lông phát huy tối đa tiềm năng và đam mê.
                            </p>
                        </Card>
                    </div>

                    {/* Core Values */}
                    <div className="mb-12">
                        <Card imgAlt="Core Values Image" imgSrc={images.values}>
                            <h2 className="text-2xl font-semibold mb-4">Giá trị cốt lõi</h2>
                            <ul className="list-disc list-inside">
                                <li className="text-lg">Chất lượng: Cam kết cung cấp sản phẩm tốt nhất từ các thương hiệu uy tín.</li>
                                <li className="text-lg">Uy tín: Đặt lợi ích khách hàng lên hàng đầu, tạo dựng niềm tin lâu dài.</li>
                                <li className="text-lg">Đam mê thể thao: Luôn đồng hành cùng cộng đồng yêu thích cầu lông, tạo nên môi trường thể thao năng động và tích cực.</li>
                            </ul>
                        </Card>
                    </div>
                </div>
            </section>

            <section className="bg-white dark:bg-gray-900">
                <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Us</h2>
                    <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.</p>
                    <form action="#" className="space-y-8">
                        <div>
                            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                            <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required />
                        </div>
                        <div>
                            <label for="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
                            <input type="text" id="subject" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" required />
                        </div>
                        <div className="sm:col-span-2">
                            <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
                            <textarea id="message" rows="6" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..."></textarea>
                        </div>
                        <button type="submit" className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send message</button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Home;