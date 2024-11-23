import Blogs from '../components/Blogs';
import Pagination from '../components/Pagination';
import Header from '../components/Header';

function Home() {
    return (
        <div className="bg-gray-100 min-h-screen">
            <Header />
            <div className="container mx-auto px-4 mt-20 mb-16">
                <Blogs />
                <Pagination />
            </div>
        </div>
    );
}

export default Home;
