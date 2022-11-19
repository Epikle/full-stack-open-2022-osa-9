import { Entry } from '../types';
import { assertNever } from '../util';
import HealthCheck from './HealthCheckEntry';
import Hospital from './HospitalEntry';
import OccupationalHealthcare from './OccupationalHealthcareEntry';

type Props = {
  entry: Entry;
};

const EntryDetails: React.FC<Props> = ({ entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return <Hospital entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcare entry={entry} />;
    case 'HealthCheck':
      return <HealthCheck entry={entry} />;

    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
