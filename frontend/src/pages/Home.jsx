import { useAuth } from "../context/AuthContext";

/* const Home = () => {
  const { user, isAuthenticated } = useAuth();

  console.log(user, isAuthenticated);

  return <h1>Home</h1>;
}; */

/* const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to Home Page
      </h1>

      <p className="text-gray-600 text-center max-w-xl">
        This is the home page of your full-stack project.
        From here, users will explore features, videos, or dashboards
        after authentication.
      </p>
    </div>
  );
}; */


const Home = () => {
  const { user, isAuthenticated, loading } = useAuth();

  console.log("User:", user);
  console.log("Is Authenticated:", isAuthenticated);
  console.log("Loading:", loading);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to Home Page
      </h1>

      <p className="text-gray-600 text-center max-w-xl">
        This is the home page of your full-stack project.
        From here, users will explore features, videos, or dashboards
        after authentication.
      </p>
    </div>
  );
};

export default Home;





