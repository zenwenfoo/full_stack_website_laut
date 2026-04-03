import {useEffect} from "react";
import {useLocation} from "react-router-dom";

export default function ScrollToTop() {
    const {pathname} = useLocation();

    useEffect(() => {
        // safety unlock in case any modal left the body fixed
        const b = document.body;
        b.style.position = "";
        b.style.top = "";
        b.style.left = "";
        b.style.right = "";
        b.style.width = "";

        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, [pathname]);

    return null;
}