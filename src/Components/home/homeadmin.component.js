import { Route, Routes } from "react-router-dom";
import SideBar from "../../Common/sidebar.common";
import ProductAdmin from "../admin/products/product.admin.component";
import NewsAdmin from "../admin/news/new.admin.component";
import "../../Common/styles/admin.scss";
import TrackPageView from "../../Common/trackpageview";

const HomeAdmin = () => {
    return (
        <>
         <TrackPageView />
            <SideBar />
            <div className="admin">
                <Routes>
                    <Route path="/admin/product" element={< ProductAdmin />} />
                    <Route path="/admin/tin-tuc/" element={<NewsAdmin />} />
                </Routes>
            </div>
        </>
    )

}

export default HomeAdmin;