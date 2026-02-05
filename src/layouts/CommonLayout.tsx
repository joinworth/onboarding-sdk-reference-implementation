import { Outlet } from "react-router"

export const CommonLayout: React.FC = () => {
    return <div className="min-h-fit py-12 px-6">
        <div className="max-w-4xl mx-auto">
            <Outlet />
        </div>
    </div>
}