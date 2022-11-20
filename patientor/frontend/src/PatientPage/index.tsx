import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';

import { Diagnosis, Entry, EntryWithoutId, Gender, Patient } from '../types';
import { apiBaseUrl } from '../constants';
import { addEntry, setDiagnoses, updatePatient, useStateValue } from '../state';
import EntryDetails from '../components/EntryDetails';
import AddEntryModal from '../AddEntryModal';

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const closeModal = (): void => {
    setModal(false);
    setError(undefined);
  };

  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const { data: diagnosesFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnoses(diagnosesFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    const fetchPatientById = async (id: string) => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );

        dispatch(updatePatient(patientFromApi));

        if (diagnoses.length === 0) {
          await fetchDiagnoses();
        }

        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    };

    if (id && !patients[id]?.ssn) {
      void fetchPatientById(id);
      return;
    }

    setLoading(false);
  }, []);

  const submitNewEntry = async (values: EntryWithoutId) => {
    if (!id) return;

    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );

      dispatch(addEntry({ id, newEntry }));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e.response?.data.message || 'Unrecognized axios error');
        setError(
          String(e.response?.data.message) || 'Unrecognized axios error'
        );
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };

  const genderIcon: Record<Gender, string> = {
    male: '♂',
    female: '♀',
    other: '?',
  };

  if (!id || loading) return <p>Loading...</p>;

  return (
    <>
      <h2>
        {patients[id].name} {genderIcon[patients[id].gender]}
      </h2>
      <p>ssn: {patients[id].ssn}</p>
      <p>occupation: {patients[id].occupation}</p>
      <h3>entries</h3>
      {patients[id].entries.map((entry) => (
        <EntryDetails key={entry.id} entry={entry} />
      ))}
      <AddEntryModal
        modalOpen={modal}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => setModal(true)}>
        Add new entry
      </Button>
    </>
  );
};

export default PatientPage;
