import { useState } from 'react'
import AdminNav from "../components/AdminNav";
import Alert from '../components/Alert';
import useAuth from '../hooks/useAuth';

const ChangePassword = () => {
  const { savePassword } = useAuth()
  const [alert, setAlert] = useState({})
  const [password, setPassword] = useState({
    pwd_current: '',
    pwd_new: ''
  })

  // Action when the button is touched
  const handleSubmit = async e => {
    e.preventDefault()

    // Check if fields password are empty
    if(Object.values(password).some(field => field === '')) {
      setAlert({
        msg: 'All fields are required',
        error: true
      })
      return
    }

    // Check if the password has at least 8 characters
    if(password.pwd_new.length < 6) {
      setAlert({
        msg: 'The password must have at least 8 characters',
        error: true
      })
      return
    }

    const result = await savePassword(password)
    setAlert(result)

  }

  const { msg } = alert 

  return (
    <>
      <AdminNav />

      <h2 className="font-black text-3xl text-center mt-10">Change Password</h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Modify your {""}
        <span className="text-indigo-600 font-bold">Password here</span>
      </p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
          {msg && <Alert alert={alert} />}
          <form onSubmit={handleSubmit}>
            <div className="mt-3">
              <label className="uppercase font-bold text-gray-600">Current Password</label>
              <input
                type="password"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="pwd_current"
                placeholder="Type your current password"
                onChange={ e => setPassword({
                  ...password,
                  [e.target.name]: e.target.value
                })}
              />
            </div>

            <div className="mt-3">
              <label className="uppercase font-bold text-gray-600">New Password</label>
              <input
                type="password"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="pwd_new"
                placeholder="Type your new password"
                onChange={ e => setPassword({
                  ...password,
                  [e.target.name]: e.target.value
                })}
              />
            </div>

            <input
              type="submit"
              value="Update Password"
              className="bg-indigo-600 w-full p-3 mt-5 text-white uppercase font-bold hover:bg-indigo-700
                cursor-pointer trasition-colors rounded-lg"
            />
          </form>
        </div>
      </div>

    </>
  );
};

export default ChangePassword;
