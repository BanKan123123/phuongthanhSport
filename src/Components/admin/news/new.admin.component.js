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
        detail: [
            {
                title: "",
                description: "",
                image: "",
                data: ""
            },
        ]
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
            [name]: value.trim(),
        }));
    };

    const handleAddNews = async () => {
        try {
            await axios.post(API_NEWS, newNews);
            navigate(0);
        } catch (err) {
            console.err(err);
        }
    };


    // Function to handle input change for the detail array
    const handleDetailChange = (index, e) => {
        const { name, value } = e.target;
        const updatedDetails = newNews.detail.map((detail, i) =>
            i === index ? { ...detail, [name]: value.trim() } : detail
        );
        setNewNews((prevNews) => ({
            ...prevNews,
            detail: updatedDetails,
        }));
    };

    const uploadImageToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append("upload_preset", "phuongthanhsport");
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/danxxxdpj/image/upload`, // Thay YOUR_CLOUD_NAME bằng tên Cloudinary của bạn
            {
                method: "POST",
                body: formData,
            }
        );

        const data = await response.json();
        if (data.secure_url) {
            return data.secure_url; // Trả về URL ảnh được tải lên
        } else {
            throw new Error("Failed to upload image to Cloudinary");
        }
    }

    // Function to handle file input for images in detail array
    const handleDetailFileChange = async (index, e) => {
        const file = e.target.files[0];

        const urlImage = await uploadImageToCloudinary(file);

        const updatedDetails = newNews.detail.map((detail, i) =>
            i === index ? { ...detail, image: urlImage } : detail
        );

        setNewNews((prevNews) => ({
            ...prevNews,
            detail: updatedDetails,
        }));
    };

    // Add new detail section
    const addNewDetail = () => {
        setNewNews((prevNews) => ({
            ...prevNews,
            detail: [...prevNews.detail, { title: "", description: "", image: "", data: "" }],
        }));
    };

    // Remove a detail section
    const removeDetail = (index) => {
        const updatedDetails = newNews.detail.filter((_, i) => i !== index);
        setNewNews((prevNews) => ({
            ...prevNews,
            detail: updatedDetails,
        }));
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

                        {/* Chi tiết */}
                        <div>
                            {newNews.detail.map((detailItem, index) => (
                                <div key={index} className="mb-4 border p-3 rounded">
                                    <h3>Chi tiết {index + 1}</h3>
                                    <div className="mb-4">
                                        <Label htmlFor={`detail-title-${index}`} value="Tiêu đề chi tiết" />
                                        <TextInput
                                            id={`detail-title-${index}`}
                                            name="title"
                                            value={detailItem.title}
                                            onChange={(e) => handleDetailChange(index, e)}
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <Label htmlFor={`detail-description-${index}`} value="Mô tả chi tiết" />
                                        <Textarea
                                            id={`detail-description-${index}`}
                                            name="description"
                                            value={detailItem.description}
                                            onChange={(e) => handleDetailChange(index, e)}
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <Label htmlFor={`detail-image-${index}`} value="Hình ảnh (Chọn ảnh từ máy)" />
                                        <input
                                            type="file"
                                            id={`detail-image-${index}`}
                                            name="image"
                                            accept="image/*"
                                            onChange={(e) => handleDetailFileChange(index, e)}
                                            required
                                        />
                                        {detailItem.image && (
                                            <div>
                                                <img src={detailItem.image} alt="Uploaded Preview" className="mt-2" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="mb-4">
                                        <Label htmlFor={`detail-data-${index}`} value="Thông tin thêm" />
                                        <Textarea
                                            id={`detail-data-${index}`}
                                            name="data"
                                            value={detailItem.data}
                                            onChange={(e) => handleDetailChange(index, e)}
                                            required
                                        />
                                    </div>

                                    {/* Remove detail section */}
                                    {newNews.detail.length > 1 && (
                                        <Button color="red" onClick={() => removeDetail(index)}>
                                            Xóa chi tiết
                                        </Button>
                                    )}
                                </div>
                            ))}

                            {/* Button to add a new detail */}
                            <Button onClick={addNewDetail} className="mt-4">
                                Thêm chi tiết mới
                            </Button>
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
                                    {product.detail.map((item, index) => (
                                        <img key={index} src={item.image} alt={item.title} style={{ width: "100px" }} />
                                    ))}
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
