import React, { useEffect } from "react";
import axios from "axios";
import { Container, Icon, Divider } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { useStateValue, setPatient } from "../state";
import { apiBaseUrl } from "../constants";
import { Patient, Entry } from "../types";
import PatientEntry from "./PatientEntry";

const PatientPage = () => {
  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const currentPatient = Object.values(patient).find(
    (patient: Patient) => patient.id === id
  );

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );

        dispatch(setPatient(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    const patientAlreadyExist = Object.keys(patient).includes(id);

    if (!patientAlreadyExist) {
      void fetchPatient();
    }
  }, [dispatch]);

  return (
    <div className="App">
      <Container>
        <h3>
          {currentPatient?.name}{" "}
          <Icon name={currentPatient?.gender === "male" ? "mars" : "venus"} />
        </h3>
      </Container>
      <Divider />
      <Container>
        <p>ssn: {currentPatient?.ssn}</p>
        <p>occupation: {currentPatient?.occupation}</p>
      </Container>
      {currentPatient !== undefined && currentPatient.entries.length > 0 && (
        <>
          <Divider />
          <Container>
            <h4>Entries</h4>
          </Container>
          <Divider />

          {currentPatient.entries.map((entry: Entry) => (
            <PatientEntry entry={entry} key={entry.id} />
          ))}
        </>
      )}
    </div>
  );
};

export default PatientPage;
