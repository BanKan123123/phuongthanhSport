import { Table, Modal, Button, Label, TextInput, Textarea } from "flowbite-react";
import { useState, useEffect } from "react";
import { API_NEWS } from "../../../Common/const/api.const";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NewsAdmin = () => {
    const [news, setNews] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newNews, setNewNews] = useState({
        title: "",
        description: "",
        images: [""]
    });
    const navigate = useNavigate();

    const fetchNews = async () => {
        try {
            const response = await axios.get(API_NEWS);
            setNews(response.data);
        } catch (error) {
            console.error("Error fetching news:", error);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_NEWS}/${id}`);
            navigate(0);
        } catch (err) {
            console.log(err.message);
        }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewNews((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAddNews = async () => {
        try {
            const response = await fetch(API_NEWS, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newNews),
            });
            if (response.ok) {
                fetchNews(); // Refresh the list after successful addition
                setIsModalOpen(false); // Close the modal
            }
        } catch (error) {
            console.error("Error adding news:", error);
        }
    };

    return (
        <>
            <h1>Tin tức</h1>
            <Button onClick={() => setIsModalOpen(true)}>Thêm mới tin tức</Button>

            {/* Modal for adding news */}
            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Modal.Header>Thêm mới tin tức</Modal.Header>
                <Modal.Body>
                    <form>
                        {/* Tiêu đề */}
                        <div className="mb-4">
                            <Label htmlFor="title" value="Tiêu đề" />
                            <TextInput
                                id="title"
                                name="title"
                                value={newNews.title}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        {/* Mô tả */}
                        <div className="mb-4">
                            <Label htmlFor="description" value="Mô tả" />
                            <Textarea
                                id="description"
                                name="description"
                                value={newNews.description}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        {/* Hình ảnh */}
                        <div className="mb-4">
                            <Label htmlFor="images" value="Hình ảnh (Past link hình ảnh vào đây)" />
                            <Textarea
                                id="images"
                                name="images"
                                value={newNews.images.join(", ")} // Hiển thị dưới dạng chuỗi
                                onChange={(e) => {
                                    const urls = e.target.value.split(",").map(url => url.trim());
                                    setNewNews({ ...newNews, images: urls });
                                }}
                                required
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleAddNews}>Thêm mới</Button>
                    <Button color="gray" onClick={() => setIsModalOpen(false)}>
                        Hủy
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="overflow-x-auto">
                <Table>
                    <Table.Head>
                        <Table.HeadCell>Id</Table.HeadCell>
                        <Table.HeadCell>Tiêu đề</Table.HeadCell>
                        <Table.HeadCell>Mô tả</Table.HeadCell>
                        <Table.HeadCell>Hình ảnh</Table.HeadCell>
                        <Table.HeadCell>Xóa</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {news.map((product) => (
                            <Table.Row key={product.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {product.id}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {product.title}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {product.description}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    <img src={product.images} alt={product.title} style={{ width: "100px" }} />
                                </Table.Cell>
                                <Table.Cell>
                                    <button
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() => handleDelete(product.id)}
                                    >
                                        Xóa
                                    </button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        </>
    );
};


export default NewsAdmin;
