import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
    return (
        <>
            <main className="container mx-auto md:grid md:grid-cols-2 mt-12 gap-20 p-5 items-center">
                <Outlet /> {/* Load the main component and then load the component's content  */}
            </main>
        </>
    )
};

export default AuthLayout;
