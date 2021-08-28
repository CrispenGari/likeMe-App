import "/Skeleton.sass";
const Skeleton = ({ type }) => {
  const className = `skeleton ${type}`;
  return <div className={className}></div>;
};

export default Skeleton;
