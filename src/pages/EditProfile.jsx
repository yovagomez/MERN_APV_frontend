import { useState, useEffect } from 'react'
import AdminNav from "../components/AdminNav";
import useAuth from "../hooks/useAuth";
import Alert from '../components/Alert';

const EditProfile = () => {
  const { auth, updateProfile } = useAuth();
  const [profile, setProfile] = useState({})
  const [alert, setAlert] = useState({})
  
  // Use to not modify the original state until the changes are stored
  useEffect( () => {
    setProfile(auth)
  }, [auth])

  const handleSubmit = async e => {
    e.preventDefault()

    const { name, email } = profile

    // Check if required fields like profile and email are filled
    if([name, email].includes('')) {
        setAlert({
            msg: 'Name and email are required',
            error: true
        })
        return
    }
    
    const result = await updateProfile(profile)
    setAlert(result)
  }

  const { msg } = alert

  return (
    <>
      <AdminNav />

      <h2 className="font-black text-3xl text-center mt-10">Edit Profile</h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Modify your {""}
        <span className="text-indigo-600 font-bold">Information here</span>
      </p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
          {msg && <Alert alert={alert} />}
          <form onSubmit={handleSubmit}>
            <div className="mt-3">
              <label className="uppercase font-bold text-gray-600">Name</label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="name"
                value={profile.name || ''}
                onChange={ e => setProfile({ 
                    ...profile,
                    [e.target.name]: e.target.value
                })}
              />
            </div>

            <div className="mt-3">
              <label className="uppercase font-bold text-gray-600">
                Web site
              </label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="web"
                value={profile.web || ''}
                onChange={ e => setProfile({
                    ...profile,
                    [e.target.name]: e.target.value
                })}
              />
            </div>

            <div className="mt-3">
              <label className="uppercase font-bold text-gray-600">
                Phone Number
              </label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="phone"
                value={profile.phone || ''}
                onChange={ e => setProfile({
                    ...profile,
                    [e.target.name]: e.target.value
                })}
              />
            </div>

            <div className="mt-3">
              <label className="uppercase font-bold text-gray-600">Email</label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="email"
                value={profile.email || ''}
                onChange={ e => setProfile({
                    ...profile,
                    [e.target.name]: e.target.value
                })}
              />
            </div>

            <input
              type="submit"
              value="Save Changes"
              className="bg-indigo-600 w-full p-3 mt-5 text-white uppercase font-bold hover:bg-indigo-700
                cursor-pointer trasition-colors rounded-lg"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
