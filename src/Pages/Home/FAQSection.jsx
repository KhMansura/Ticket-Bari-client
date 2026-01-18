const FAQSection = () => {
    return (
        <div className="py-20 bg-base-100">
            <div className="max-w-3xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-3">Frequently Asked Questions</h2>
                    <p className="text-slate-500">Everything you need to know about TicketBari.</p>
                </div>
                <div className="space-y-4">
                    <div className="collapse collapse-plus bg-base-200">
                        <input type="radio" name="my-accordion-3" defaultChecked /> 
                        <div className="collapse-title text-xl font-medium">How do I book a ticket?</div>
                        <div className="collapse-content"> 
                            <p>Simply search for your destination, select your preferred transport, choose your seat, and pay securely via Stripe.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-plus bg-base-200">
                        <input type="radio" name="my-accordion-3" /> 
                        <div className="collapse-title text-xl font-medium">Can I cancel my booking?</div>
                        <div className="collapse-content"> 
                            <p>Yes, you can cancel bookings from your dashboard if the status is still "pending". Once a vendor accepts or it's paid, please contact support.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-plus bg-base-200">
                        <input type="radio" name="my-accordion-3" /> 
                        <div className="collapse-title text-xl font-medium">Is my payment secure?</div>
                        <div className="collapse-content"> 
                            <p>We use Stripe, a world-leading payment gateway, ensuring your card details are 100% encrypted and safe.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default FAQSection;