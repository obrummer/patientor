import React, { useEffect } from "react";
import axios from "axios";
import { Container, Icon, Divider, Button } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { useStateValue, setPatient } from "../state";
import { apiBaseUrl } from "../constants";
import { Patient, Entry } from "../types";
import PatientEntry from "./PatientEntry";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

const PatientPage = () => {
  const [{ patient }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const { id } = useParams<{ id: string }>();

  const currentPatient = Object.values(patient).find(
    (patient: Patient) => patient.id === id
  );

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

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

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(setPatient(newEntry));

      closeModal();
    } catch (error: unknown) {
      console.error("Unknown Error");
      setError("Unknown error");
    }
  };

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
      {currentPatient !== undefined && currentPatient.entries?.length > 0 && (
        <>
          <Divider />
          <Container>
            <h4>Entries</h4>
          </Container>
          <Divider />

          {currentPatient?.entries.map((entry: Entry) => (
            <PatientEntry entry={entry} key={entry.id} />
          ))}
        </>
      )}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New entry</Button>
    </div>
  );
};

export default PatientPage;
