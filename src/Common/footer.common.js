import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <>
            <footer class="bg-zinc-50 text-center text-surface/75 dark:bg-neutral-700 dark:text-white/75 lg:text-left px-6 lg:px-24">
                <div class="flex flex-col lg:flex-row items-center justify-center lg:justify-between border-b-2 border-neutral-200 p-6 dark:border-white/10">
                    <div class="mb-4 lg:mb-0 hidden lg:block">
                        <span>Hãy kết nối với chúng tôi trên các mạng xã hội:</span>
                    </div>
                    <div class="flex justify-center space-x-6">
                        <a href="https://www.facebook.com/profile.php?id=61566847335730&is_tour_dismissed" class="h-6 w-6">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 320 512">
                                <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5 16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                            </svg>
                        </a>
                        <a href="#!" class="h-6 w-6">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512">
                                <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                            </svg>
                        </a>
                        <a href="#!" class="h-6 w-6">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 488 512">
                                <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                            </svg>
                        </a>
                        <a href="#!" class="h-6 w-6">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512">
                                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                            </svg>
                        </a>
                    </div>
                </div>

                <div class="mx-6 py-10 text-center md:text-left">
                    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        <div>
                            <h6 class="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
                                <span class="me-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="h-4 w-4">
                                        <path d="M12.378 1.602a.75.75 0 00-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03zM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 00.372-.648V7.93zM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 00.372.648l8.628 5.033z" />
                                    </svg>
                                </span>
                                Phương Thanh Sport
                            </h6>
                        </div>

                        <div>
                            <h6 class="mb-4 flex justify-center font-semibold uppercase md:justify-start">Liên hệ</h6>
                            <p class="mb-4 flex items-center justify-center md:justify-start">
                                <span class="me-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="h-4 w-4">
                                        <path d="M11.25 3v8.264l7.382 4.308L22.5 13.9V5.635L11.25 3zM1.5 6.014v8.264L9.618 18.9 12 17.639V9.375L1.5 6.014zM12 19.528v1.75l2.382-1.363v-1.75L12 19.528zm-1.5-1.75v1.75L6.618 19.5v-1.75L10.5 17.639z" />
                                    </svg>
                                </span>
                                Hà Nội, Việt Nam
                            </p>
                            <p class="mb-4 flex items-center justify-center md:justify-start">
                                <span class="me-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="h-4 w-4">
                                        <path d="M12 1.75C6.48 1.75 2 6.23 2 11.75S6.48 21.75 12 21.75 22 17.27 22 11.75 17.52 1.75 12 1.75zm-4 12a4 4 0 110-8 4 4 0 010 8z" />
                                    </svg>
                                </span>
                                phuongthanhsport2@gmail.com
                            </p>
                            <p class="mb-4 flex items-center justify-center md:justify-start">
                                <span class="me-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="h-4 w-4">
                                        <path d="M11.25 2a.75.75 0 00-.756 0L3 6.632v5.736l9 5.25V7.25L11.25 2zm8.5 7.93v5.736l-8.628 5.032a.75.75 0 01-.372.097V7.93l9 5.25z" />
                                    </svg>
                                </span>
                                0787197663
                            </p>
                        </div>

                        <div>
                            <h6 class="mb-4 flex justify-center font-semibold uppercase md:justify-start">Liên hệ với chúng tôi</h6>
                            <p class="mb-4">
                                <Link to="https://www.tiktok.com/@phuongthanhsport" class="block text-blue-600 dark:text-blue-500">Tiktok</Link>
                                <Link to="https://www.facebook.com/profile.php?id=61566847335730&is_tour_dismissed" class="block text-blue-600 dark:text-blue-500">Facebook</Link>
                            </p>
                        </div>
                    </div>
                </div>

                <div class="text-center p-6 bg-neutral-200 dark:bg-neutral-600">
                    <span>© 2024 Copyright: </span>
                    <a class="text-neutral-600 dark:text-neutral-300 font-semibold" href="https://thoitrangthethaoali.com/">Phương Thanh Sport</a>
                </div>
            </footer>
        </>
    )
}

export default Footer;