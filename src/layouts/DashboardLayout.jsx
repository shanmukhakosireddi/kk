import { Outlet } from "react-router-dom";
import SideBar from "../components/Sidebar";

const DashboardLayout = () => {
    return (
        <div>
            <header>
                Header
            </header>

            <div>
                <aside>
                    <SideBar/>
                </aside>

                <main>
                    <Outlet />
                </main>
            </div>

            <footer>
                Footer
            </footer>
        </div>
    );
};

export default DashboardLayout;