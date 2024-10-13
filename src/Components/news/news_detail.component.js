import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "flowbite-react";
import { API_NEWS } from "../../Common/const/api.const";

const NewsDetail = () => {
    const [news, setNews] = useState({
        id: null,
        title: '',
        description: '',
        images: [],
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

    console.log(news);

    return (
        <div className="container mx-auto my-10 px-4">
            <Card className="shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <h1 className="text-4xl font-bold text-center mb-6 text-blue-900">
                    {news.title}
                </h1>
                {news.images.length > 0 && (
                    <img
                        src={news.images[0]} // Cập nhật với URL hình ảnh thực tế
                        alt={news.title}
                        className="object-cover w-full h-96 rounded-lg mb-6"
                    />
                )}
                <p className="mt-6 text-gray-800 text-lg leading-relaxed tracking-wide p-6 bg-white rounded-lg border border-gray-200">
                    <span className="block font-semibold text-xl text-blue-800 mb-4">Mô tả chi tiết:</span>
                    {news.description.split('. ').map((sentence, index) => (
                        <span key={index} className="block mb-2">
                            {sentence}.
                        </span>
                    ))}
                </p>
            </Card>
        </div>
    );
}

export default NewsDetail;
