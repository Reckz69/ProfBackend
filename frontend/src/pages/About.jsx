const About = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4">
            About This{" "}
            <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Project
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A modern, full-stack web application built with cutting-edge technologies
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12 mb-12">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed text-lg mb-6">
              This project is a comprehensive content management platform built using modern web technologies.
              It combines the power of React for the frontend with a robust Node.js backend, providing a
              seamless and scalable user experience.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-8">Technology Stack</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="p-6 bg-linear-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-2xl">⚛️</span>
                  Frontend
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• React.js with modern hooks</li>
                  <li>• Tailwind CSS for styling</li>
                  <li>• React Router for navigation</li>
                  <li>• Context API for state management</li>
                </ul>
              </div>

              <div className="p-6 bg-linear-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-2xl">🚀</span>
                  Backend
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Node.js with Express</li>
                  <li>• MongoDB with Mongoose</li>
                  <li>• JWT authentication</li>
                  <li>• RESTful API architecture</li>
                </ul>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-10">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-linear-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Secure Authentication</h3>
                <p className="text-gray-600 text-sm">
                  JWT-based authentication system with secure token management
                </p>
              </div>

              <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Analytics Dashboard</h3>
                <p className="text-gray-600 text-sm">
                  Comprehensive analytics and insights for content performance
                </p>
              </div>

              <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Media Management</h3>
                <p className="text-gray-600 text-sm">
                  Upload and manage images, videos, and multimedia content
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="text-center bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 shadow-xl">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-blue-100 mb-6 text-lg">
            Join our platform and start building your content empire today
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/register"
              className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Create Account
            </a>
            <a
              href="/login"
              className="px-8 py-3 bg-blue-700/50 hover:bg-blue-700 text-white font-semibold rounded-xl border border-white/30 transition-all duration-300"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
