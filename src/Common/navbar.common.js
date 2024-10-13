import React from 'react';
import logo from '../public/images/ACADEMY (1).png';
import './styles/navbar.scss';
import { Navbar } from 'flowbite-react';
const NarbarHome = () => {
    return (
        <>
            <Navbar style={{
                padding: '0 90px'
            }} fluid rounded>
                <Navbar.Brand >
                    <img src={logo} className="rounded-full w-20 h-20" alt="Phuong Thanh Sport Logo" />
                    <Navbar.Link href = "/home" className="self-center whitespace-nowrap text-3xl font-semibold dark:text-white">Phương Thành Sport</Navbar.Link>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Navbar.Link className = "text-xl font-bold" href="/home" active>
                        Home
                    </Navbar.Link>
                    <Navbar.Link className = "text-xl font-bold" href="/home/tin-tuc">Tin Tức</Navbar.Link>
                    <Navbar.Link className = "text-xl font-bold" href="/home/product">Sản phẩm</Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
};
export default NarbarHome;
