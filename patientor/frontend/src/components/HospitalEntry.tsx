import { HospitalEntry } from '../types';

type Props = {
  entry: HospitalEntry;
};

const Hospital: React.FC<Props> = ({ entry }) => {
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

      <div>diagnose by {entry.specialist}</div>
    </article>
  );
};

export default Hospital;
