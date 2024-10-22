import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Carousel, Badge } from "flowbite-react";
import { API_NEWS } from "../../Common/const/api.const";

const NewsDetail = () => {
    const [news, setNews] = useState({
        id: null,
        title: '',
        description: '',
        images: [],
        detail: []
    });
    const { id } = useParams();

    useEffect(() => {
        const fetchDataNewById = async () => {
            try {
                const response = await axios.get(`${API_NEWS}/${id}`);
                setNews(response.data);
            } catch (error) {
                console.error("Error fetching the news data:", error);
            }
        };

        fetchDataNewById();
    }, [id]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [news]);

    return (
        <div className="container mx-auto my-10 px-4">
            <Card className="shadow-lg hover:shadow-2xl transition-shadow duration-300">
                {/* Title */}
                <h1 className="text-4xl font-bold text-center mb-6 text-blue-900">
                    {news.title}
                </h1>

                {/* Carousel for multiple images */}
                {news.images.length > 0 && (
                    <div className="mb-6">
                        <Carousel>
                            {news.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`news-img-${index}`}
                                    className="object-cover w-full h-96 rounded-lg"
                                />
                            ))}
                        </Carousel>
                    </div>
                )}

                {/* Description */}
                <p className="mt-6 text-gray-800 text-lg leading-relaxed tracking-wide p-6 bg-white rounded-lg border border-gray-200">
                    {news.description.split('. ').map((sentence, index) => (
                        <span key={index} className="block mb-2">
                            {sentence}.
                        </span>
                    ))}
                </p>

                {/* Detailed list of products */}
                {news.detail.length > 0 && (
                    <div className="mt-6">
                        {news.detail.map((item, index) => (
                            <div
                                key={index}
                                className="border border-gray-300 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white overflow-hidden"
                            >
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-blue-900 mb-4">
                                        {item.title}
                                    </h3>
                                    {/* Description */}
                                    <div className="text-gray-700 leading-relaxed mb-4 space-y-2">
                                        <h3 className="text-xl font-semibold text-blue-900 mb-4"> Mô tả: </h3>
                                        {item.description.split('\n').map((line, index) => (
                                            <p key={index}>
                                                {line.split('. ').map((sentence, subIndex) => (
                                                    <span key={subIndex}>
                                                        {sentence}.
                                                        {subIndex < line.split('. ').length - 1 ? <br /> : null} {/* Thêm <br /> giữa các câu */}
                                                    </span>
                                                ))}
                                            </p>
                                        ))}
                                    </div>
                                    {/* Image container with Flexbox to center the image */}
                                    <div className="flex justify-center mb-4">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="h-full w-full sm:w-[500px] md:w-[550px] lg:w-[600px] xl:w-[650] object-cover"
                                        />
                                    </div>
                                    {/* Data */}
                                    <div className="text-gray-800 text-lg leading-relaxed space-y-2">
                                        <h3 className="text-xl font-semibold text-blue-900 mb-4">  Đặc điểm nổi bật: </h3>
                                        {item.data.split('\n').map((line, lineIndex) => (
                                            <p key={lineIndex}>
                                                {line.split('. ').map((feature, featureIndex) => (
                                                    <span key={featureIndex}>
                                                        {feature}.
                                                        {featureIndex < line.split('. ').length - 1 ? <br /> : null} {/* Thêm <br /> giữa các câu */}
                                                    </span>
                                                ))}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Card>
        </div>
    );
}

export default NewsDetail;
