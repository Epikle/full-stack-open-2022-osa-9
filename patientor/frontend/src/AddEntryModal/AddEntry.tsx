import { Button } from '@material-ui/core';
import { useState } from 'react';

import { EntryType, EntryWithoutId } from '../types';
import AddEntryForm from './AddEntryForm';

type Props = {
  onSubmit: (values: EntryWithoutId) => void;
  onCancel: () => void;
};

type EntryOption = {
  value: EntryType;
  label: string;
};

const entryOptions: EntryOption[] = [
  { value: EntryType.HealthCheck, label: 'HealthCheck' },
  { value: EntryType.Hospital, label: 'Hospital' },
  { value: EntryType.OccupationalHealthcare, label: 'OccupationalHealthcare' },
];

export const AddEntry: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [form, setForm] = useState<EntryType | undefined>();

  switch (form) {
    case EntryType.HealthCheck:
      return (
        <AddEntryForm
          onSubmit={onSubmit}
          onCancel={onCancel}
          initialValues={{
            type: 'HealthCheck',
            description: '',
            date: '',
            specialist: '',
            diagnosisCodes: [],
            healthCheckRating: 0,
          }}
        />
      );

    case EntryType.Hospital:
      return (
        <AddEntryForm
          onSubmit={onSubmit}
          onCancel={onCancel}
          initialValues={{
            type: 'Hospital',
            description: '',
            date: '',
            specialist: '',
            diagnosisCodes: [],
            discharge: {
              criteria: '',
              date: '',
            },
          }}
        />
      );

    case EntryType.OccupationalHealthcare:
      return (
        <AddEntryForm
          onSubmit={onSubmit}
          onCancel={onCancel}
          initialValues={{
            type: 'OccupationalHealthcare',
            description: '',
            date: '',
            specialist: '',
            diagnosisCodes: [],
            employerName: '',
            sickLeave: {
              startDate: '',
              endDate: '',
            },
          }}
        />
      );

    default:
      return (
        <div style={{ marginTop: 10, textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {entryOptions.map((option) => (
              <Button
                key={option.value}
                variant="contained"
                onClick={() => setForm(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>

          <Button
            color="secondary"
            variant="contained"
            style={{ marginTop: 30 }}
            type="button"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      );
  }
};

export default AddEntry;
