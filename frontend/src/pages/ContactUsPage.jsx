import React from 'react';
import ContactUs from '../components/ContactUs';

const ContactUsPage = () => {
    return (
        <div className="pt-24 bg-bg-light transition-colors duration-300 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-20">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-text-dark mb-6 font-poppins">Contact Our Team</h1>
                    <p className="text-xl text-text-muted max-w-2xl mx-auto font-nunito">
                        Whether you need a new installation or quick service, we're just a message away.
                    </p>
                </div>
                <ContactUs />
            </div>
        </div>
    );
};

export default ContactUsPage;
