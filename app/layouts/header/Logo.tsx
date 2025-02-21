"use client";

import Image from "next/image";

const logoUrl = process.env.NEXT_PUBLIC_MEDIA_URL + "logo/stores/1/logo_white.png";

const Logo = () => (
 <Image src={logoUrl} alt="Logo" width={225} height={75} />
);

export default Logo;