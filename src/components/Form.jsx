import { useState, useEffect } from "react";
import Alert from "./Alert";
import usePatients from "../hooks/usePatients";

const Form = () => {
  // Catch form data
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [id, setId] = useState(null)

  //Show successfull and error alerts
  const [alert, setAlert] = useState({});

  // Have access to the patients from Patients Provider
  const { savePatient, patient } = usePatients();

  useEffect(() => {
    if(patient?.name) {
        setName(patient.name)
        setOwner(patient.owner)
        setEmail(patient.email)
        setDate(patient.date)
        setSymptoms(patient.symptoms)
        setId(patient._id)
    }
  },[patient])

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation
    if ([name, owner, email, date, symptoms].includes("")) {
      setAlert({
        msg: "All the fields are required",
        error: true,
      });
      return;
    }

    // We call the function savePatients and pass it the patient parameters
    savePatient({ name, owner, email, date, symptoms, id });
    // If there is a alert, we remove it
    setAlert({
        msg: 'Saved Successufully'
    });
    setName('')
    setOwner('')
    setEmail('')
    setDate('')
    setSymptoms('')
    setId('')
  };

  const { msg } = alert;

  return (
    <>
      <h2 className="font-black text-3xl text-center"> Patients Manager</h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Add your Patients and {""}{" "}
        <span className="text-indigo-600 font-bold"> Manage them</span>
      </p>

      <form
        className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-5">
          <label htmlFor="name" className="text-gray-700 uppercase font-bold">
            Pet
          </label>
          <input
            id="name"
            type="text"
            placeholder="The pet's name"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>

        <div className="mb-5">
          <label htmlFor="owner" className="text-gray-700 uppercase font-bold">
            Owner
          </label>
          <input
            id="owner"
            type="text"
            placeholder="Owner name"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          ></input>
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="text-gray-700 uppercase font-bold">
            Email
          </label>
          <input
            id="email"
            type="text"
            placeholder="Owner email"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>

        <div className="mb-5">
          <label htmlFor="date" className="text-gray-700 uppercase font-bold">
            Discharge date
          </label>
          <input
            id="date"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          ></input>
        </div>

        <div className="mb-5">
          <label
            htmlFor="symptoms"
            className="text-gray-700 uppercase font-bold"
          >
            Symptoms
          </label>
          <textarea
            id="symptoms"
            placeholder="Describe the symptons"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          ></textarea>
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700
                cursor-pointer trasition-colors"
          value={ id ? 'Save Changes' : 'Add Patient'}
        />
      </form>

      {msg && <Alert alert={alert} />}
    </>
  );
};

export default Form;
