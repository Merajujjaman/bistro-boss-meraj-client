import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import Category from "./Category";
import ChefBanner from "./ChefBanner";
import Featured from "./Featured";
import PopularManu from "./PopularManu";
import Reviews from "./Reviews";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Home</title>
            </Helmet>
            <Banner></Banner>
            <Category></Category>
            <ChefBanner></ChefBanner>
            <PopularManu></PopularManu>
            <Featured></Featured>
            <Reviews></Reviews>
        </div>
    );
};

export default Home;