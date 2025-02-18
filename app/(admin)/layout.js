import Sidebar from "@/components/sidebar";
import { ToastContainer } from "react-toastify";

export default function AdminLayout({children}){
    return (<>
        <ToastContainer 
          position="top-right"
          autoClose={2000}
          hideProgressBar
          style={{ top: "100px" }}
        />
    <Sidebar children={children}/>
    </>);
}