import React, { useState } from 'react';
import orderCoverImg from '../../assets/shop/banner2.jpg'
import Cover from '../Home/components/Cover';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../Hooks/useMenu';
import OrderTab from './OrderTab';
import { useParams } from 'react-router-dom';

const Order = () => {
    const {category} = useParams()
    const categories =['dessert', 'pizza', 'salad', 'soup', 'drinks']
    const i = categories.indexOf(category)

    const [tabIndex, setTabIndex] = useState(i);
    const [menu] = useMenu()
    const dessert = menu.filter(item => item.category === 'dessert')
    const soup = menu.filter(item => item.category === 'soup')
    const salad = menu.filter(item => item.category === 'salad')
    const pizza = menu.filter(item => item.category === 'pizza')
    const drinks = menu.filter(item => item.category === 'drinks')
    return (
        <>
            <Cover img={orderCoverImg} coverTitle='order now'></Cover>
            <div className='text-center mt-20'>
                <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <TabList>
                        <Tab>Dessert</Tab>
                        <Tab>Pizza</Tab>
                        <Tab>Salad</Tab>
                        <Tab>Soup</Tab>
                        <Tab>Drinks</Tab>
                    </TabList>

                    <TabPanel>
                        <OrderTab items={dessert}></OrderTab>
                    </TabPanel>

                    <TabPanel>
                        <OrderTab items={pizza}></OrderTab>
                    </TabPanel>

                    <TabPanel>
                        <OrderTab items={salad}></OrderTab>
                    </TabPanel>

                    <TabPanel>
                        <OrderTab items={soup}></OrderTab>
                    </TabPanel>

                    <TabPanel>
                        <OrderTab items={drinks}></OrderTab>
                    </TabPanel>
                </Tabs>
            </div>
        </>
    );
};

export default Order;