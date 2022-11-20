import { useStateValue } from '../state';
import { HospitalEntry } from '../types';

type Props = {
  entry: HospitalEntry;
};

const Hospital: React.FC<Props> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();

  const styles: React.CSSProperties = {
    border: '1px solid black',
    padding: 5,
    marginBottom: 5,
    borderRadius: 5,
  };

  return (
    <article style={styles}>
      <div>{entry.date} 🏥</div>
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
      {entry.discharge.criteria && entry.discharge.date && (
        <div>
          {entry.discharge.date} - {entry.discharge.criteria}
        </div>
      )}
      <div>diagnose by {entry.specialist}</div>
    </article>
  );
};

export default Hospital;
