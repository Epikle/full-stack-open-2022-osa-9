import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { Diagnosis, Gender, Patient } from '../types';
import { apiBaseUrl } from '../constants';
import { setDiagnoses, updatePatient, useStateValue } from '../state';

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(true);

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
        <div key={entry.id}>
          {entry.date} - {entry.description}
          {entry.diagnosisCodes && (
            <ul>
              {entry.diagnosisCodes.map((code) => (
                <li key={code}>
                  {code}{' '}
                  {diagnoses.find((diagnose) => diagnose.code === code)?.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </>
  );
};

export default PatientPage;
