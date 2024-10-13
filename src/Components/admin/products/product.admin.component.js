import axios from "axios";
import { useEffect, useState } from "react";
import { API_PRODUCT } from "../../../Common/const/api.const";
import { Table, Button, Modal, TextInput, Textarea } from "flowbite-react";
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

    const [newColour, setNewColour] = useState(""); // Để quản lý màu sắc tạm thời
    const [newSize, setNewSize] = useState(""); // Để quản lý kích thước tạm thời


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

    const handleAddColour = () => {
        if (newColour) {
            setNewProduct({
                ...newProduct,
                colours: [...newProduct.colours, newColour],
            });
            setNewColour("");
        }
    };

    const handleAddSize = () => {
        if (newSize) {
            setNewProduct({
                ...newProduct,
                size: [...newProduct.size, newSize],
            });
            setNewSize("");
        }
    };

    const handleRemoveColour = (index) => {
        const updatedColours = [...newProduct.colours];
        updatedColours.splice(index, 1);
        setNewProduct({
            ...newProduct,
            colours: updatedColours,
        });
    };

    const handleRemoveSize = (index) => {
        const updatedSizes = [...newProduct.size];
        updatedSizes.splice(index, 1);
        setNewProduct({
            ...newProduct,
            size: updatedSizes,
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
            <h1>Products</h1>
            <Button onClick={() => setShowModal(true)}>Add Product</Button>

            <div className="overflow-x-auto">
                <Table>
                    <Table.Head>
                        <Table.HeadCell>Id</Table.HeadCell>
                        <Table.HeadCell>Product Name</Table.HeadCell>
                        <Table.HeadCell>Brand</Table.HeadCell>
                        <Table.HeadCell>Colours</Table.HeadCell>
                        <Table.HeadCell>Size</Table.HeadCell>
                        <Table.HeadCell>Price</Table.HeadCell>
                        <Table.HeadCell>Status</Table.HeadCell>
                        <Table.HeadCell>Images</Table.HeadCell>
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
                                        <img key={index} src= {image} alt={`product-${index}`} width="50" />
                                    ))}
                                </Table.Cell>
                                <Table.Cell>
                                    <button
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() => handleDelete(product.id)}
                                    >
                                        Delete
                                    </button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>

            {/* Modal */}
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <Modal.Header>Add Product</Modal.Header>
                <Modal.Body>
                    <form>
                        <TextInput
                            label="Product Code (ma)"
                            name="ma"
                            value={newProduct.ma}
                            onChange={handleInputChange}
                        />
                        <TextInput
                            label="Product Name"
                            name="name"
                            value={newProduct.name}
                            onChange={handleInputChange}
                        />
                        <Textarea
                            label="Images (comma-separated URLs)"
                            name="images"
                            value={newProduct.images}
                            onChange={handleInputChange}
                        />
                        <TextInput
                            label="Brand"
                            name="brand"
                            value={newProduct.brand}
                            onChange={handleInputChange}
                        />

                        {/* Màu sắc */}
                        <div className="mb-4">
                            <label>Colours:</label>
                            <div className="flex">
                                <TextInput
                                    name="newColour"
                                    value={newColour}
                                    onChange={(e) => setNewColour(e.target.value)}
                                    placeholder="Add a colour"
                                />
                                <Button onClick={handleAddColour} className="ml-2">Add</Button>
                            </div>
                            <div className="mt-2">
                                {newProduct.colours.map((colour, index) => (
                                    <div key={index} className="flex items-center">
                                        <span>{colour}</span>
                                        <Button
                                            size="xs"
                                            className="ml-2 text-red-500"
                                            onClick={() => handleRemoveColour(index)}
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Kích thước */}
                        <div className="mb-4">
                            <label>Sizes:</label>
                            <div className="flex">
                                <TextInput
                                    name="newSize"
                                    value={newSize}
                                    onChange={(e) => setNewSize(e.target.value)}
                                    placeholder="Add a size"
                                />
                                <Button onClick={handleAddSize} className="ml-2">Add</Button>
                            </div>
                            <div className="mt-2">
                                {newProduct.size.map((size, index) => (
                                    <div key={index} className="flex items-center">
                                        <span>{size}</span>
                                        <Button
                                            size="xs"
                                            className="ml-2 text-red-500"
                                            onClick={() => handleRemoveSize(index)}
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <TextInput
                            label="Price"
                            name="price"
                            value={newProduct.price}
                            onChange={handleInputChange}
                        />
                        <Textarea
                            label="Description"
                            name="description"
                            value={newProduct.description}
                            onChange={handleInputChange}
                        />
                        <Textarea
                            label="Data"
                            name="data"
                            value={newProduct.data}
                            onChange={handleInputChange}
                        />
                        <div className="mt-2">
                            <label>Status:</label>
                            <select
                                name="status"
                                value={newProduct.status}
                                onChange={(e) =>
                                    setNewProduct({
                                        ...newProduct,
                                        status: e.target.value === "true",
                                    })
                                }
                            >
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </select>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleSubmit}>Submit</Button>
                    <Button color="gray" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};



export default ProductAdmin;
