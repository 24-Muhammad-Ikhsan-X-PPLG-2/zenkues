import React from 'react';

const Footer = () => {
    return (
        <footer className="mt-12 flex flex-col items-center justify-between gap-4 py-8 text-sm text-gray-500 md:flex-row">
            <div className="flex gap-4">
                <a className="hover:text-gray-900" href="#">
                    Pricing
                </a>
                <a className="hover:text-gray-900" href="#">
                    Templates
                </a>
                <a className="hover:text-gray-900" href="#">
                    Docs
                </a>
                <a className="hover:text-gray-900" href="#">
                    Contact
                </a>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex gap-3 text-gray-600">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M22 4.01c-.77.35-1.6.58-2.46.69a4.2 4.2 0 0 0 1.85-2.32 8.26 8.26 0 0 1-2.62 1 4.13 4.13 0 0 0-7 3.76A11.73 11.73 0 0 1 3 4.79a4.13 4.13 0 0 0 1.28 5.5 4.08 4.08 0 0 1-1.87-.52v.05a4.14 4.14 0 0 0 3.31 4.05 4.2 4.2 0 0 1-1.86.07 4.14 4.14 0 0 0 3.86 2.87A8.29 8.29 0 0 1 2 19.54a11.7 11.7 0 0 0 6.29 1.84c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.35-.02-.53A8.36 8.36 0 0 0 22 4.01z" />
                    </svg>
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M12 2v20" />
                    </svg>
                </div>
                <div>© {new Date().getFullYear()} Zenkues</div>
            </div>
        </footer>
    );
};

export default Footer;
