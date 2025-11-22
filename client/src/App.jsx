import Footer from "./components/Footer.jsx"
import Header from "./components/Header.jsx"
import Pagination from "./components/Pagination.jsx";
import Search from "./components/Search.jsx";
import UserList from "./components/UserList.jsx";

function App() {

    return (
        <>
            <Header />
            <main className="main">

                <section className="card users-container">
                    <Search />
                    <UserList/>
                    <Pagination/>
                </section>



            {/* <!-- User details component  --> */}
            {/* <!-- Create/Edit Form component  --> */}
            {/* <!-- Delete user component  --> */}
            </main>
            <Footer />
        </>
    )
}

export default App