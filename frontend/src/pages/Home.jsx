import React from 'react';
import Hero from '../components/Hero';
import Products from '../components/Products';
import SpareParts from '../components/SpareParts';
import WhyChooseUs from '../components/WhyChooseUs';
import ContactUs from '../components/ContactUs';

const Home = ({ isDarkMode }) => {
    return (
        <>
            <Hero isDarkMode={isDarkMode} />
            <Products />
            <SpareParts />
            <WhyChooseUs />
            <ContactUs />
        </>
    );
};

export default Home;
