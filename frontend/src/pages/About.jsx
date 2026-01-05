const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold mb-4">
        About This Project
      </h1>

      <p className="text-gray-600 text-center max-w-xl">
        This project is built using React, Tailwind CSS,
        and a Node.js backend with JWT authentication.
        It follows a clean and scalable architecture.
      </p>
    </div>
  );
};

export default About;
