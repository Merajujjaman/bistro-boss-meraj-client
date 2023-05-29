import React from 'react';
import { Helmet } from 'react-helmet-async';
import Cover from '../Home/components/Cover';
//image import 
import coverImg from '../../assets/menu/banner3.jpg'
import dessertImg from '../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../assets/menu/pizza-bg.jpg'
import saladImg from '../../assets/menu/salad-bg.jpg'
import soupImg from '../../assets/menu/soup-bg.jpg'

import useMenu from '../../Hooks/useMenu';
import MenuCategory from './MenuCategory';
import SectionTitle from '../Home/components/SectionTitle';


const Menu = () => {
    const [menu] = useMenu()
    const dessert = menu.filter(item => item.category === 'dessert')
    const soup = menu.filter(item => item.category === 'soup')
    const salad = menu.filter(item => item.category === 'salad')
    const pizza = menu.filter(item => item.category === 'pizza')
    const offered = menu.filter(item => item.category === 'offered')
    
    

    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>
            <div className>
                <Cover img={coverImg} coverTitle='our menu'></Cover>
                {/* today's offer */}
                <SectionTitle subtitle="don't Miss" title="today's offer"></SectionTitle>
                <MenuCategory items={offered}></MenuCategory>
                {/* desserts */}
                <MenuCategory items={dessert} categoryImg={dessertImg} title="dessert"></MenuCategory>
                <MenuCategory items={pizza} categoryImg={pizzaImg} title="pizza"></MenuCategory>
                <MenuCategory items={salad} categoryImg={saladImg} title="salad"></MenuCategory>
                <MenuCategory items={soup} categoryImg={soupImg} title="soup"></MenuCategory>
            </div>
        </div>
    );
};

export default Menu;