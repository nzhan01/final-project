export default function AboutPage() {
    return (
        <div className="flex flex-col items-center bg-gradient-to-b from-rose-100 to-pink-200 min-h-screen p-8 text-center">
            <h1 className="text-5xl font-bold mb-6 text-rose-600"> About Our Project</h1>

            <div className="max-w-3xl text-lg text-gray-700 space-y-6">
                <p>
                    Welcome to our CS391 Final Project! We created a fun and interactive Cocktail Generator and Search app that lets you discover new drinks or find your favorite ones.
                </p>

                <p>
                    Every cocktail includes instructions in English, Spanish, and French (when available), making it accessible for a global audience.
                </p>

                <p>
                    Our project is powered by the free and publicly available <span className="font-semibold text-rose-500">Cocktail DB API</span>, which provides all the recipes and images you see throughout the site.
                </p>
            </div>

            <h2 className="text-4xl font-semibold mt-12 mb-8 text-rose-500">Our Favorite Drinks</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="flex flex-col items-center">
                    <img
                        src="https://www.thecocktaildb.com/images/media/drink/kpsajh1504368362.jpg"
                        alt="Cosmopolitan"
                        className="w-48 h-48 rounded-2xl shadow-lg object-cover mb-4 hover:scale-105 transition-transform duration-300"
                    />
                    <p className="text-xl font-medium text-gray-800"><strong>Nicholas:</strong> Cosmopolitan</p>
                </div>

                <div className="flex flex-col items-center">
                    <img
                        src="https://www.thecocktaildb.com/images/media/drink/n0sx531504372951.jpg"
                        alt="Espresso Martini"
                        className="w-48 h-48 rounded-2xl shadow-lg object-cover mb-4 hover:scale-105 transition-transform duration-300"
                    />
                    <p className="text-xl font-medium text-gray-800"><strong>Annika:</strong> Espresso Martini</p>
                </div>


                <div className="flex flex-col items-center">
                    <img
                        src="https://www.thecocktaildb.com/images/media/drink/8xnyke1504352207.jpg"
                        alt="Screwdriver"
                        className="w-48 h-48 rounded-2xl shadow-lg object-cover mb-4 hover:scale-105 transition-transform duration-300"
                    />
                    <p className="text-xl font-medium text-gray-800"><strong>Cindy:</strong> Screwdriver</p>
                </div>

                <div className="flex flex-col items-center">
                    <img
                        src="https://www.thecocktaildb.com/images/media/drink/rptuxy1472669372.jpg"
                        alt="French 75"
                        className="w-48 h-48 rounded-2xl shadow-lg object-cover mb-4 hover:scale-105 transition-transform duration-300"
                    />
                    <p className="text-xl font-medium text-gray-800"><strong>Mai:</strong> French 75</p>
                </div>

                <div className="flex flex-col items-center">
                    <img
                        src="https://www.thecocktaildb.com/images/media/drink/twyrrp1439907470.jpg"
                        alt="Mai Tai"
                        className="w-48 h-48 rounded-2xl shadow-lg object-cover mb-4 hover:scale-105 transition-transform duration-300"
                    />
                    <p className="text-xl font-medium text-gray-800"><strong>Shanika:</strong> Mai Tai</p>
                </div>
            </div>
        </div>
    );
}

