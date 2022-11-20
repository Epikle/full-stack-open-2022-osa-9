import { useStateValue } from '../state';
import { OccupationalHealthcareEntry } from '../types';

type Props = {
  entry: OccupationalHealthcareEntry;
};

const OccupationalHealthcare: React.FC<Props> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();

  const styles: React.CSSProperties = {
    border: '1px solid black',
    padding: 5,
    marginBottom: 5,
    borderRadius: 5,
  };

  return (
    <article style={styles}>
      <div>
        {entry.date} 📄 {entry.employerName}
      </div>
      <div>{entry.description}</div>
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
      {entry.sickLeave?.startDate && entry.sickLeave?.endDate && (
        <div>
          {entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}
        </div>
      )}
      <div>diagnose by {entry.specialist}</div>
    </article>
  );
};

export default OccupationalHealthcare;
