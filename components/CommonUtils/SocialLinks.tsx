import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";

function SocialLinks(props: any) {
    return (
        <>
            <Link
                href={"https://www.facebook.com/profile.php?id=61556760246851"}
                target="_blank"
            >
                <FaFacebook className={`${props.className}`} />{" "}
            </Link>
            <Link href={"https://www.instagram.com/2vntravel/"} target="_blank">
                {" "}
                <AiFillInstagram className={`${props.className}`} />{" "}
            </Link>
            <Link href={"https://twitter.com/2vntravel"} target="_blank">
                <FaXTwitter className={`${props.className}`} />
            </Link>
            <Link href={"https://www.youtube.com/@2vntravel"} target="_blank">
                {" "}
                <FaYoutube className={`${props.className}`} />{" "}
            </Link>
        </>
    )
}

export default SocialLinks