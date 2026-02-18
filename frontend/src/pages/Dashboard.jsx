import useAuth from "../context/useAuth";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-white">
      <h1 className="mb-4 text-center text-5xl font-extrabold md:text-6xl">
        Welcome, {user?.name || "Guest"}!
      </h1>
      <p className="mb-8 max-w-xl text-center text-xl md:text-2xl">
        Your dashboard is ready.
      </p>

      <div className="flex space-x-4">
        <p className="mb-8 max-w-xl text-center">
          Your Email:{" "}
          <span className="text-xl font-semibold">
            {user?.email || "Not available"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
