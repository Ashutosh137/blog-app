import React from 'react';

function MyComponent() {
  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      <section className="relative flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/images/hero-bg.jpg)' }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center max-w-4xl">
          <h1 className="text-6xl font-extrabold leading-tight animate-fadeInUp">
            Discover, Create, and Share Your Story
          </h1>
          <p className="mt-4 text-lg text-gray-300 animate-fadeInUp delay-200">
            Join the ultimate blogging platform and bring your voice to the world.
          </p>
          <a href="#" className="mt-8 inline-block bg-primary2 text-white py-3 px-8 rounded-full text-lg hover:bg-primary3 transition duration-300 animate-bounce">
            Start Your Journey
          </a>
        </div>
      </section>

      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center">
            <h2 className="text-4xl font-bold animate-fadeInUp">Why Choose Us?</h2>
            <p className="mt-4 text-lg text-gray-300 animate-fadeInUp delay-200">
              We provide everything you need to start, grow, and succeed with your blog.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center animate-fadeInUp delay-300">
              <div className="flex items-center justify-center w-16 h-16 bg-primary2 text-white rounded-full mb-6 mx-auto">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M13 16h-1v-4H8l4-8v6h3l-4 6z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Intuitive Design</h3>
              <p className="text-gray-400">Our platform is built with a user-friendly interface that is both powerful and easy to use.</p>
            </div>
            <div className="text-center animate-fadeInUp delay-400">
              <div className="flex items-center justify-center w-16 h-16 bg-primary2 text-white rounded-full mb-6 mx-auto">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 8c-3.86 0-7 3.14-7 7a9.965 9.965 0 001.684 5.529L12 20h0l5.316-5.471A9.965 9.965 0 0019 15c0-3.86-3.14-7-7-7zm0-3a3 3 0 100-6 3 3 0 000 6z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Advanced Tools</h3>
              <p className="text-gray-400">Take advantage of our professional-grade tools to enhance your blogging experience.</p>
            </div>
            <div className="text-center animate-fadeInUp delay-500">
              <div className="flex items-center justify-center w-16 h-16 bg-primary2 text-white rounded-full mb-6 mx-auto">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 12l3-3m0 0l3 3m-3-3v12"></path>
                  <path d="M21 12l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Seamless Sharing</h3>
              <p className="text-gray-400">Easily share your content across all major social media platforms with a single click.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center">
            <h2 className="text-4xl font-bold animate-fadeInUp">What Our Users Say</h2>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-gray-800 p-8 rounded-lg text-center animate-fadeInUp delay-300">
              <p className="text-lg italic text-gray-400">&quot;MyBlog has transformed my blogging experience. The tools are incredible and the design is stunning!&quot;</p>
              <p className="mt-4 text-primary font-semibold">- Alex J.</p>
            </div>
            <div className="bg-gray-800 p-8 rounded-lg text-center animate-fadeInUp delay-400">
              <p className="text-lg italic text-gray-400">&quot;The best blogging platform I&apos;ve ever used. Everything is intuitive and easy to navigate.&quot;</p>
              <p className="mt-4 text-primary font-semibold">- Sarah K.</p>
            </div>
            <div className="bg-gray-800 p-8 rounded-lg text-center animate-fadeInUp delay-500">
              <p className="text-lg italic text-gray-400">&quot;I love how simple it is to share my content across social media. MyBlog makes it a breeze!&quot;</p>
              <p className="mt-4 text-primary font-semibold">- Michael W.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 text-center">
          <h2 className="text-4xl font-bold animate-fadeInUp">Ready to Share Your Story?</h2>
          <p className="mt-4 text-lg text-gray-300 animate-fadeInUp delay-200">
            Join a community of passionate bloggers today and start creating your masterpiece.
          </p>
          <a href="#" className="mt-8 inline-block bg-primary2 text-white py-3 px-8 rounded-full text-lg hover:bg-primary3 transition duration-300 animate-bounce">
            Join Now
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-6">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 text-center">
          <p className="text-gray-400">&copy; 2024 MyBlog. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="#" className="text-gray-400 hover:text-primary transition duration-300">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-primary transition duration-300">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
export default MyComponent;