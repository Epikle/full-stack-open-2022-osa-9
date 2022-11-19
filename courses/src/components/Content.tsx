import { CoursePart } from '../types';
import Part from './Part';

type Props = {
  courseParts: CoursePart[];
};

const Content: React.FC<Props> = ({ courseParts }) => {
  return (
    <>
      {courseParts.map((course, index) => (
        <p key={index}>
          <strong>
            {course.name} {course.exerciseCount}
          </strong>
          <Part coursePart={course} />
        </p>
      ))}
    </>
  );
};

export default Content;
