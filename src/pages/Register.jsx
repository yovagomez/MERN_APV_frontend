import { useState } from 'react'
import { Link } from "react-router-dom"
import Alert from '../components/Alert'
import axiosClient from '../config/axios'

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [ alert, setAlert ] = useState({});

  const handleSubmit = async e => {
    e.preventDefault(); // Avoid the action pre default
    
    // Validate if the fields are empty by creating an array with the values
    if([name, email, password, repeatPassword].includes('')){
        setAlert({ msg: 'There are fields empty', error: true})
        return;
    }

    // Validate if the passwords are the same
    if(password !== repeatPassword) {
        setAlert({ msg: 'The passwords are not the same', error: true})
        return;
    }

    // Validate if the password length complies with the rule
    if(password.length < 8) {
        setAlert({ msg: 'The password is too short, add at least 8 characters', error: true})
        return;
    }

    setAlert({});

    // Create the user at the API
    try {
        const url = `/vets`
        await axiosClient.post(url, {name, email, password})
        setAlert({
            msg: "Successfully created, check your email",
            error: false
        })
    } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true
        })
    }

  }

  const { msg } = alert
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Create an account and Manage your {""}
          <span className="text-black">Patients</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {/* This is a hook that comunicates with other components  */}
        {/* If there is a message, so display alert component */}
        {msg && <Alert
            alert={alert} 
        />}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              NAME
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              EMAIL
            </label>
            <input
              type="email"
              placeholder="Register email"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              PASSWORD
            </label>
            <input
              type="password"
              placeholder="New password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              REPEAT PASSWORD
            </label>
            <input
              type="password"
              placeholder="Repeat the new password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={repeatPassword}
              onChange={e => setRepeatPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Register"
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
          />
        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
          <Link className="block text-center my-5 text-gray-500" to="/">
            ¿Do you already have an account? Sign in
          </Link>
          <Link className="block text-center my-5 text-gray-500" to="/forget-password">
            ¿Did you forget your password?
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Register;
