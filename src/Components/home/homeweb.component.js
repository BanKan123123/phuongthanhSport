import { Route, Routes } from "react-router-dom";
import NarbarHome from "../../Common/navbar.common";
import Home from "./home.component";
import ProductComponent from "../product/product.component";
import DetailProduct from "../product/detail/product-detail.component";
import Footer from "../../Common/footer.common";
import NewsPage from "../news/news.component";
import NewsDetail from "../news/news_detail.component";

const HomeWeb = () => {
    return (
        <>
            <NarbarHome />
            <Routes>
                <Route path="" element={<Home />} />
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/home/product" element={< ProductComponent />} />
                <Route path="/home/product/detail/:id" element={<DetailProduct />} />
                <Route path="/home/tin-tuc/" element={<NewsPage />} />
                <Route path="/home/tin-tuc/:id" element={<NewsDetail />} />
            </Routes>
            <Footer />
        </>
    )

}

export default HomeWeb;
