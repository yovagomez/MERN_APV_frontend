import { createContext, useState, useEffect } from "react";
import axiosClient from "../config/axios";
import useAuth from '../hooks/useAuth'

// createContext = Allows us to access different parts of the application, globally
const PatientsContext = createContext();

// It's like one big component that's gonna have all the application components as children. It is similar to a component
export const PatientsProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);
  const [patient, setPatient] = useState({});
  const { auth } = useAuth();

  // When the page is loaded, we get the patients list
  useEffect(() => {
    const getPatients = async () => {
      try {
        // Get the token because has the id vet information
        const token = localStorage.getItem("token");
        if (!token) return;

        // Since we are requesting an API, we need to send the authentication configuration (which needs it)
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        // We make  the request
        const { data } = await axiosClient("/patients", config);
        setPatients(data);
      } catch (error) {
        console.log(error);
      }
    };
    getPatients();
  }, [auth]);

  // Create a new Patient
  const savePatient = async (patient) => {
    // Bring token of the LocalStorge
    const token = localStorage.getItem("token");
    // Since we are requesting an API, we need to send the authentication configuration (which needs it)
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    // Check if id exists to know if action is save or edit
    if (patient.id) {
      try {
        const { data } = await axiosClient.put(
          `/patients/${patient.id}`,
          patient,
          config
        );

        // Iterate over patients and compare if the useState  and DB date is the same to rewrite the new information
        const patientsUpdated = patients.map((patientState) =>
          patientState._id === data._id ? data : patientState
        );
        setPatients(patientsUpdated);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        // Send data to  the DB
        const { data } = await axiosClient.post("/patients", patient, config);
        // Eliminate those attributes that we do not want
        const { createdAt, updatedAt, __v, ...patientStored } = data;
        setPatients([patientStored, ...patientStored]);
      } catch (error) {
        console.log(error.response.data.msg);
      }
    }
  };

  // Edit a patient
  const setEdition = (patient) => {
    setPatient(patient);
  };

  const deletePatient = async (id) => {
    const confirmAction = confirm("¿Are you sure you want to delete this patient?");

    if (confirmAction) {
      try {
        // Bring token of the LocalStorge
        const token = localStorage.getItem("token");
        // Since we are requesting an API, we need to send the authentication configuration (which needs it)
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        // Consume the API to delete the patient
        const { data } = await axiosClient.delete(`/patients/${id}`, config)
        
        // We create a new array without the deleted patient
        const patientUpdated = patients.filter( patientsState => patientsState._id !== id)
        setPatients(patientUpdated)
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <PatientsContext.Provider
      value={{
        patients,
        savePatient,
        setEdition,
        patient,
        deletePatient,
      }}
    >
      {/* All chidren components  */}
      {children}
    </PatientsContext.Provider>
  );
};

export default PatientsContext;
