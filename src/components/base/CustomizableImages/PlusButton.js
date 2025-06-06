const PlusButton = ({
  width = 60,
  height = 50,
  color = '#30324B',
}) => {
  return (
    <svg width={width} height={height} viewBox="0 0 60 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="59" height="49" rx="9.5" stroke={color} />
      <rect x="29" y="10" width="2" height="30" fill={color} />
      <rect x="45" y="24" width="2" height="30" transform="rotate(90 45 24)" fill={color} />
    </svg>
  );
};

export default PlusButton;
