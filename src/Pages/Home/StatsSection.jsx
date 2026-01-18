const StatsSection = () => {
    return (
        <div className="bg-primary text-primary-content py-16">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    <div className="space-y-2">
                        <div className="text-4xl font-extrabold">50K+</div>
                        <div className="text-sm uppercase tracking-widest opacity-80">Happy Travelers</div>
                    </div>
                    <div className="space-y-2">
                        <div className="text-4xl font-extrabold">120+</div>
                        <div className="text-sm uppercase tracking-widest opacity-80">Verified Vendors</div>
                    </div>
                    <div className="space-y-2">
                        <div className="text-4xl font-extrabold">450+</div>
                        <div className="text-sm uppercase tracking-widest opacity-80">Daily Routes</div>
                    </div>
                    <div className="space-y-2">
                        <div className="text-4xl font-extrabold">24/7</div>
                        <div className="text-sm uppercase tracking-widest opacity-80">Customer Support</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default StatsSection;