import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_NEWS } from '../../Common/const/api.const';

const NewsPage = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchDataNews = async () => {
            try {
                const response = await axios.get(API_NEWS); // Đảm bảo await axios.get
                setNews(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchDataNews(); // Gọi hàm fetchDataNews
    }, []); // Thêm dependency array để chỉ chạy một lần khi component mount

    return (
        <div className="bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800">Bài viết mới nhất</h1>
                    <p className="text-gray-600">Luôn cập nhật các tiêu đề và bài viết mới nhất</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {news.map((newItem) => ( // Đổi tên biến từ new thành newItem
                        <div key={newItem.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <img
                                className="w-full h-56 object-cover"
                                src={newItem.detail[0].image} // Thay thế src bằng ảnh đầu tiên trong mảng images
                                alt={newItem.title}
                                style={{ width: "800px", height: "600px" }}
                            />
                            <div className="p-6">
                                <h2 className="text-xl font-bold text-gray-800">{newItem.title}</h2> {/* Hiển thị tiêu đề */}
                                <p className="text-gray-600 mt-2">
                                    {newItem.description.length > 100 ? `${newItem.description.substring(0, 100)}...` : newItem.description} {/* Hiển thị mô tả */}
                                </p>
                                <Link to={`/home/tin-tuc/${newItem.id}`} className="text-blue-500 hover:underline mt-4 block">Đọc thêm</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewsPage;
