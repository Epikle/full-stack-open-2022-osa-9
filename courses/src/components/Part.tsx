import { CoursePart } from '../types';
import { assertNever } from '../util';

type Props = {
  coursePart: CoursePart;
};

const Part: React.FC<Props> = ({ coursePart }) => {
  switch (coursePart.type) {
    case 'normal':
      return (
        <div>
          <i>{coursePart.description}</i>
        </div>
      );

    case 'groupProject':
      return <div>project exercises {coursePart.groupProjectCount}</div>;

    case 'submission':
      return <div>submit to {coursePart.exerciseSubmissionLink}</div>;

    case 'special':
      return (
        <div>
          <i>{coursePart.description}</i>
          <br />
          required skills: {coursePart.requirements.join(', ')}
        </div>
      );

    default:
      return assertNever(coursePart);
  }
};

export default Part;
