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
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        try {
            await axios.post(API_PRODUCT, newProduct);
            setProducts([...products, newProduct]);
            setShowModal(false); // Đóng modal sau khi thêm sản phẩm
        } catch (error) {
            console.error(error.message);
        }
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
                            <Label htmlFor="images" value="Hình ảnh (note: Paste link hình ảnh vào đây, sau mỗi ảnh thêm dấu ',')" />
                            <Textarea
                                id="images"
                                name="images"
                                onChange={(e) => {
                                    const urls = e.target.value.split(",").map(url => url.trim());
                                    setNewProduct({ ...newProduct, images: urls });
                                }}
                                required
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
                                value={newProduct.size.join(", ")} // Hiển thị dưới dạng chuỗi
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
                                value={newProduct.colours.join(", ")} // Hiển thị dưới dạng chuỗi
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
