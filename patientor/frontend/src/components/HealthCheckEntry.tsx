import { useStateValue } from '../state';
import { HealthCheckEntry, HealthCheckRating } from '../types';

type Props = {
  entry: HealthCheckEntry;
};

const heart: Record<HealthCheckRating, string> = {
  0: '๐',
  1: '๐',
  2: '๐งก',
  3: 'โค',
};

const HealthCheck: React.FC<Props> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();

  const styles: React.CSSProperties = {
    border: '1px solid black',
    padding: 5,
    marginBottom: 5,
    borderRadius: 5,
  };
  return (
    <article style={styles}>
      <div>{entry.date} ๐ฉโโ๏ธ</div>
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
      <div>{heart[entry.healthCheckRating]}</div>
      <div>diagnose by {entry.specialist}</div>
    </article>
  );
};

export default HealthCheck;
