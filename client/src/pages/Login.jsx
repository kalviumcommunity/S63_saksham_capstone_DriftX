const Login = () => {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold">Login</h2>
        <form className="mt-4 space-y-4">
          <input type="email" placeholder="Email" className="p-2 border w-full" />
          <input type="password" placeholder="Password" className="p-2 border w-full" />
          <button className="bg-black text-white px-4 py-2">Login</button>
        </form>
      </div>
    );
  };
  
  export default Login;
  