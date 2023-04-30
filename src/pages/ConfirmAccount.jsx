import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Alert from "../components/Alert";
import axiosClient from '../config/axios'

const ConfirmAccount = () => {
  const [accountConfirmed, setAccountConfirmed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({});

  // React url parameters
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmAccount = async () => {
      // Send the token to backend to confirm the account
      try {
        const url = `/vets/confirm/${id}`;
        const { data } = await axiosClient(url);
        setAccountConfirmed(true);
        setAlert({
          msg: data.msg,
          error: false
        });
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true
        });
      }
      setLoading(false);
    };
    confirmAccount();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Confirm your Account and Start Managing your {""}
          <span className="text-black">Patients</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {!loading && <Alert alert={alert} />}

        {accountConfirmed && (
          <Link className="block text-center my-5 text-gray-500" to="/">
            Log in
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmAccount;
