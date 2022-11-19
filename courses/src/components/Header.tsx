type Props = {
  courseName: string;
};

const Header: React.FC<Props> = ({ courseName }) => <h1>{courseName}</h1>;

export default Header;
