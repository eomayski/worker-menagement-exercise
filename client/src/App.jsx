import { useState } from "react";
import Footer from "./components/Footer.jsx"
import Header from "./components/Header.jsx"
import Pagination from "./components/Pagination.jsx";
import Search from "./components/Search.jsx";
import UserList from "./components/UserList.jsx";
import UserSaveModal from "./components/UserSaveModal.jsx";
import { useEffect } from "react";

function App() {
    const[users, setUsers] = useState([]);
    const [showCreateUser, setShowCreateUser] = useState(false)
    const [refresh, setRefresh] = useState(true)
    const [sortedDescent, setSortedDescent] = useState(false)

    useEffect(() => {
        fetch('http://localhost:3030/jsonstore/users')
            .then(response => response.json())
            .then(result => {
                setUsers(Object.values(result));
            })
            .catch((err) => alert(err.message));
    }, [refresh]);

    const forceRefresh = () => {
        setRefresh(state => !state)
    }

    const addUserClickHandler = () => {
        setShowCreateUser(true);
    };

    const addUserCloseHandler = () => {
        setShowCreateUser(false);
    };

    const addUserSubmitHandler = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target)

        const {country, city, street, streetNumber, ...userData} = Object.fromEntries(formData);

        userData.address = {
            country, 
            city, 
            street, 
            streetNumber
        }

        userData.createdAt = new Date().toISOString()
        userData.updatedAt = new Date().toISOString()


        fetch('http://localhost:3030/jsonstore/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(() => {
            addUserCloseHandler()
            forceRefresh()
        })
        .catch(err => alert(err.message))
    };

    const onSortCreateHandler = () => {
        if (!sortedDescent) {
            setUsers(state => [...state].sort((userA, userB) => new Date(userB.createdAt) - new Date(userA.createdAt)))
        } else {
            setUsers(state => [...state].sort((userA, userB) => new Date(userA.createdAt) - new Date(userB.createdAt)))
        }
        setSortedDescent(state => !state)
    }

    return (
        <>
            <Header />
            <main className="main">

                <section className="card users-container">
                    <Search />
                    <UserList users={users} forceRefresh={forceRefresh} onSort={onSortCreateHandler} sortedDescent={sortedDescent}/>

                    <button onClick={addUserClickHandler} className="btn-add btn">Add new user</button>

                    <Pagination/>
                </section>



            {/* <!-- User details component  --> */}
            {/* <!-- Create/Edit Form component  --> */}
            {showCreateUser &&
                <UserSaveModal
                    onClose={addUserCloseHandler}
                    onSubmit={addUserSubmitHandler}
                />}
            {/* <!-- Delete user component  --> */}
            </main>
            <Footer />
        </>
    )
}

export default App