import React from 'react';
import logo from '../public/images/ACADEMY (1).png';
import './styles/navbar.scss';
import { Navbar } from 'flowbite-react';
const NarbarHome = () => {
    return (
        <>
            <Navbar fluid rounded className="bg-white shadow">
                <Navbar.Brand>
                    <img src={logo} className="rounded-full w-16 h-16 md:w-20 md:h-20" alt="Phuong Thanh Sport Logo" />
                    <Navbar.Link href="/home" className="self-center whitespace-nowrap text-2xl md:text-3xl font-semibold dark:text-white">
                        Phương Thanh Sport
                    </Navbar.Link>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Navbar.Link className="text-lg md:text-xl font-bold" href="/home" active>
                        Trang chủ
                    </Navbar.Link>
                    <Navbar.Link className="text-lg md:text-xl font-bold" href="/home/tin-tuc">
                        Tin Tức
                    </Navbar.Link>
                    <Navbar.Link className="text-lg md:text-xl font-bold" href="/home/product">
                        Sản phẩm
                    </Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
        </>

    );
};
export default NarbarHome;
