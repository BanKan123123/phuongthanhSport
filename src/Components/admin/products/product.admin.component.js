import axios from "axios";
import { useEffect, useState } from "react";
import { API_PRODUCT } from "../../../Common/const/api.const";
import { Table, Button, Modal, TextInput, Textarea, Label } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const ProductAdmin = () => {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newProduct, setNewProduct] = useState({
        ma: "",
        name: "",
        images: [],
        brand: "",
        status: true,
        colours: [],
        size: [],
        price: "",
        description: "",
        data: ""
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editProduct, setEditProduct] = useState({
        ma: "",
        name: "",
        images: [],
        brand: "",
        status: true,
        colours: [], // Đảm bảo khởi tạo là mảng
        size: [],
        price: "",
        description: "",
        data: ""
    });
    const [uploadStatus, setUploadStatus] = useState(false);
    const [imagesChoosen, setImagesChoosen] = useState([]);

    const [uploadedImageUrls, setUploadedImageUrls] = useState([]);

    const handleFileChange = async (e) => {
        const files = Array.from(e.target.files); // Chuyển FileList thành Array
        const uploadedImageUrls = [];
        // Upload từng ảnh lên Cloudinary
        for (let i = 0; i < files.length; i++) {
            try {
                const imageUrl = await uploadImageToCloudinary(files[i]);
                uploadedImageUrls.push(imageUrl); // Thêm URL của ảnh đã upload vào mảng
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }

        // Cập nhật state của newProduct với danh sách các ảnh mới được upload
        setNewProduct((prevProduct) => ({
            ...prevProduct,
            images: [...prevProduct.images, ...uploadedImageUrls], // Giữ lại các ảnh đã có và thêm ảnh mới
        }));
    };

    const handleEditFileChange = async (e) => {
        const files = Array.from(e.target.files); // Chuyển FileList thành Array

        const uploadedImageUrls = [];
        setImagesChoosen(files);
        // Upload từng ảnh lên Cloudinary
        for (let i = 0; i < files.length; i++) {
            try {
                const imageUrl = await uploadImageToCloudinary(files[i]);
                uploadedImageUrls.push(imageUrl); // Thêm URL của ảnh đã upload vào mảng
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
        // Cập nhật state của newProduct với danh sách các ảnh mới được upload
        if (uploadedImageUrls) {
            setUploadedImageUrls(uploadedImageUrls);
            setEditProduct((prevProduct) => ({
                ...prevProduct,
                images: uploadedImageUrls, // Giữ lại các ảnh đã có và thêm ảnh mới
            }));
        } else {
            setEditProduct((prevProduct) => ({
                ...prevProduct,
            }));
        }
    };

    // Function to handle form submission (PUT request)
    const handleUpdateProduct = async () => {
        console.log("Image", imagesChoosen, "Status", uploadStatus);
        // Nếu có ảnh được upload, chờ cho đến khi hoàn tất trước khi cập nhật
        if (imagesChoosen.length > 0) {
            if (uploadStatus) {
                try {
                    await axios.put(`${API_PRODUCT}/${editProduct.id}`, {
                        ...editProduct,
                        images: uploadedImageUrls, // Kết hợp ảnh cũ và ảnh mới
                    });
                    setIsModalOpen(false); // Close the modal after updating
                    navigate(0);
                } catch (error) {
                    console.error("Error updating product:", error);
                }
            } else {
                alert("Product Wait");
            }
        } else {
            try {
                await axios.put(`${API_PRODUCT}/${editProduct.id}`, editProduct);
                setIsModalOpen(false); // Close the modal after updating
                navigate(0);
            } catch (error) {
                console.error("Error updating product:", error);
            }
        }
    };

    const uploadImageToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "phuongthanhsport"); // Thay thế bằng upload preset của bạn
        setUploadStatus(false); // Thiết lập trạng thái upload

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/danxxxdpj/image/upload`, // Thay YOUR_CLOUD_NAME bằng tên cloud của bạn
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await response.json();
            if (data.secure_url) {
                setUploadStatus(true); // Cập nhật trạng thái khi upload thành công
                return data.secure_url; // Đây là URL của hình ảnh đã upload
            } else {
                throw new Error("Failed to upload image to Cloudinary");
            }
        } catch (error) {
            setUploadStatus(false); // Cập nhật trạng thái khi có lỗi xảy ra
            console.error("Error uploading image:", error);
            throw error; // Ném lại lỗi để xử lý ngoài
        }
    };



    const navigate = useNavigate();

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_PRODUCT}/${id}`);
            navigate(0);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        const fetchDataProducts = async () => {
            try {
                const response = await axios.get(API_PRODUCT);
                setProducts(response.data);
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchDataProducts();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({
            ...newProduct,
            [name]: value.trim(),
        });
    };

    const handleSubmit = async () => {
        try {
            const data = {
                ma: newProduct.ma.trim(),
                name: newProduct.name.trim(),
                images: newProduct.images,
                brand: newProduct.brand.trim(),
                status: newProduct.status,
                colours: newProduct.colours,
                size: newProduct.size,
                price: newProduct.price.trim(),
                description: newProduct.description.trim(),
                data: newProduct.data.trim()
            };

            await axios.post(API_PRODUCT, data);
            setProducts([...products, newProduct]);
            setShowModal(false); // Đóng modal sau khi thêm sản phẩm
            navigate(0);
        } catch (error) {
            console.error(error.message);
        }
    };

    const handelEdit = (productId) => {
        const productToEdit = products.find((product) => product.id === productId);
        setEditProduct(productToEdit); // Set the product data to be edited
        setIsModalOpen(true); // Open the modal
    }

    const handleInputEditChange = (e) => {
        const { name, value } = e.target;
        setEditProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };




    return (
        <>
            <h1>Sản phẩm</h1>
            <Button onClick={() => setShowModal(true)}>Thêm mới sản phẩm</Button>

            <div className="overflow-x-auto">
                <Table>
                    <Table.Head>
                        <Table.HeadCell>Id</Table.HeadCell>
                        <Table.HeadCell>Tên sản phẩm</Table.HeadCell>
                        <Table.HeadCell>Nhãn hiệu</Table.HeadCell>
                        <Table.HeadCell>Màu sắc</Table.HeadCell>
                        <Table.HeadCell>Kích thước</Table.HeadCell>
                        <Table.HeadCell>Giá</Table.HeadCell>
                        <Table.HeadCell>Trạng thái</Table.HeadCell>
                        <Table.HeadCell>Hình ảnh</Table.HeadCell>
                        <Table.HeadCell>Action</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {products.map((product) => (
                            <Table.Row key={product.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {product.id}
                                </Table.Cell>
                                <Table.Cell>{product.name}</Table.Cell>
                                <Table.Cell>{product.brand}</Table.Cell>
                                <Table.Cell>
                                    {product.colours.length > 0 ? product.colours.join(", ") : "N/A"}
                                </Table.Cell>
                                <Table.Cell>
                                    {product.size.length > 0 ? product.size.join(", ") : "N/A"}
                                </Table.Cell>
                                <Table.Cell>{product.price}</Table.Cell>
                                <Table.Cell>{product.status ? "Active" : "Inactive"}</Table.Cell>
                                <Table.Cell>
                                    {product.images.map((image, index) => (
                                        <img key={index} src={image} alt={`product-${index}`} width="50" />
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

                                <Table.Cell>
                                    <button
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() => handelEdit(product.id)}
                                    >
                                        Sửa
                                    </button>
                                </Table.Cell>

                                {/* Modal for editing product */}
                                {editProduct && (
                                    <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                                        <Modal.Header>Edit Product</Modal.Header>
                                        <Modal.Body>
                                            <form>
                                                {/* Tên sản phẩm */}
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                        Product Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={editProduct.name}
                                                        onChange={handleInputEditChange}
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                                                    />
                                                </div>

                                                {/* Mã sản phẩm */}
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                        Product Code
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="ma"
                                                        value={editProduct.ma}
                                                        onChange={handleInputEditChange}
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                                                    />
                                                </div>

                                                {/* Hình ảnh sản phẩm */}
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                        Product Images
                                                    </label>
                                                    <input
                                                        type="file"
                                                        name="images"
                                                        multiple
                                                        accept="image/*"
                                                        onChange={(e) => handleEditFileChange(e)} // Hàm xử lý upload nhiều ảnh
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                                                    />
                                                </div>

                                                {/* Thương hiệu */}
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                        Brand
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="brand"
                                                        value={editProduct.brand}
                                                        onChange={handleInputEditChange}
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                                                    />
                                                </div>

                                                {/* Trạng thái */}
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                        Status
                                                    </label>
                                                    <select
                                                        name="status"
                                                        value={editProduct.status ? "true" : "false"}
                                                        onChange={handleInputEditChange}
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                                                    >
                                                        <option value="true">Available</option>
                                                        <option value="false">Unavailable</option>
                                                    </select>
                                                </div>

                                                {/* Màu sắc */}
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                        Colors
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="colours"
                                                        onChange={(e) => {
                                                            const colours = e.target.value.split(",").map(color => color.trim());
                                                            setEditProduct({ ...editProduct, colours: colours });
                                                        }}
                                                        placeholder="Enter colours separated by commas"
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                                                    />
                                                </div>

                                                {/* Kích thước */}
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                        Sizes
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="size"
                                                        onChange={(e) => {
                                                            const sizes = e.target.value.split(",").map(size => size.trim());
                                                            setEditProduct({ ...editProduct, size: sizes });
                                                        }}
                                                        placeholder="Enter sizes separated by commas"
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                                                    />
                                                </div>

                                                {/* Giá */}
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                        Price
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="price"
                                                        value={editProduct.price}
                                                        onChange={handleInputEditChange}
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                                                    />
                                                </div>

                                                {/* Mô tả */}
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                        Description
                                                    </label>
                                                    <textarea
                                                        name="description"
                                                        value={editProduct.description}
                                                        onChange={handleInputEditChange}
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                                                    />
                                                </div>

                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                        Danh mục sản phẩm
                                                    </label>
                                                    <select
                                                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                                        onChange={(e) => handleInputEditChange(e)}
                                                        name="category"
                                                    >
                                                        <option value="áo">Áo</option>
                                                        <option value="vợt">Vợt</option>
                                                        <option value="giày">Giày</option>
                                                    </select>
                                                </div>


                                                {/* Dữ liệu khác */}
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                        Additional Data
                                                    </label>
                                                    <textarea
                                                        name="data"
                                                        value={editProduct.data}
                                                        onChange={handleInputEditChange}
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                                                    />
                                                </div>
                                            </form>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button onClick={handleUpdateProduct}>Save Changes</Button>
                                            <Button color="gray" onClick={() => setIsModalOpen(false)}>
                                                Cancel
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                )}
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>

            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <Modal.Header>Thêm mới sản phẩm</Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-4">
                            <Label htmlFor="ma" value="Mã sản phẩm" />
                            <TextInput
                                id="ma"
                                name="ma"
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="name" value="Tên sản phẩm" />
                            <TextInput
                                id="name"
                                name="name"
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Product Images
                            </label>
                            <input
                                type="file"
                                name="images"
                                multiple
                                accept="image/*"
                                onChange={handleFileChange} // Hàm xử lý upload nhiều ảnh
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="brand" value="Nhãn hiệu" />
                            <TextInput
                                id="brand"
                                name="brand"
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        {/* Kích thước */}
                        <div className="mb-4">
                            <Label htmlFor="sizes" value="Kích thước (Thêm nhiều kích thước, sau mỗi kích thước thêm dấu ',')" />
                            <Textarea
                                id="sizes"
                                name="sizes"
                                onChange={(e) => {
                                    const sizes = e.target.value.split(",").map(size => size.trim());
                                    setNewProduct({ ...newProduct, size: sizes });
                                }}
                                required
                            />
                        </div>

                        {/* Màu sắc */}
                        <div className="mb-4">
                            <Label htmlFor="colours" value="Màu sắc, (Thêm nhiều màu sắc, sau mỗi màu sắc thêm dấu ',')" />
                            <Textarea
                                id="colours"
                                name="colours"
                                onChange={(e) => {
                                    const colours = e.target.value.split(",").map(colour => colour.trim());
                                    setNewProduct({ ...newProduct, colours });
                                }}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <Label htmlFor="price" value="Giá" />
                            <TextInput
                                id="price"
                                name="price"
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="description" value="Mô tả" />
                            <Textarea
                                id="description"
                                name="description"
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Danh mục sản phẩm
                            </label>
                            <select
                                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                onChange={(e) => handleInputChange(e)}
                                name="category"
                            >
                                <option value="áo">Áo</option>
                                <option value="vợt">Vợt</option>
                                <option value="giày">Giày</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <Label htmlFor="data" value="Dữ liệu" />
                            <Textarea
                                id="data"
                                name="data"
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mt-2">
                            <Label htmlFor="status" value="Tình trạng:" />
                            <select
                                id="status"
                                name="status"
                                onChange={(e) =>
                                    setNewProduct({
                                        ...newProduct,
                                        status: e.target.value === "true",
                                    })
                                }
                                className="border-gray-300 rounded-md shadow-sm focus:ring focus:ring-cyan-500"
                            >
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </select>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleSubmit}>Thêm mới</Button>
                    <Button color="gray" onClick={() => setShowModal(false)}>
                        Hủy
                    </Button>
                </Modal.Footer>
            </Modal>


        </>
    );
};



export default ProductAdmin;
