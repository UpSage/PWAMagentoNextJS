"use client";

import Image from "next/image";

const logoUrl = process.env.NEXT_PUBLIC_MEDIA_URL + "wysiwyg/logo_mini.png";

const Logo = () => (
 <Image src={logoUrl} alt="Logo" width={36} height={36} />
);

export default Logo;