import React, { useState } from "react";
import useAuthStore from "stores/AuthStore";
import RSA from "utils/rsa";
const Login = () => {
  const [username, setUsername] = useState("");
  const [n, setN] = useState("");
  const [e, setE] = useState("");
  const [d, setD] = useState("");

  const rsa = new RSA();

  const login = useAuthStore((_) => _.login);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    console.log(username, n, e, d);
    if (!username || !n || !e || !d) {
      return;
    }

    login({ username, n, e, d });
  };

  const handleGenerateKeys = (evt) => {
    evt.preventDefault();
    console.log("Generating keys...");
    rsa.generateKeys();
    setN(rsa.publicKey.n);
    setE(rsa.publicKey.e);
    setD(rsa.privateKey.d);
    console.log(rsa);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="w-[350px] ">
        <label htmlFor="username" className="block mb-2">
          Username
        </label>
        <input
          type="text"
          id="username"
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="n" className="block mb-2">
          Public Key (n)
        </label>
        <input
          type="number"
          id="n"
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
          value={n}
          onChange={(e) => setN(e.target.value)}
        />
        <label htmlFor="e" className="block mb-2">
          Public Key (e)
        </label>
        <input
          type="number"
          id="e"
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
          value={e}
          onChange={(e) => setE(e.target.value)}
        />
        <label htmlFor="d" className="block mb-2">
          Private Key (d){" "}
          <span className="text-red-500">
            Do not share this key with anyone!
          </span>
        </label>
        <input
          type="number"
          id="d"
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
          value={d}
          onChange={(e) => setD(e.target.value)}
        />
        <div className="flex justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Submit
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleGenerateKeys}
          >
            Generate Random Keys
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
