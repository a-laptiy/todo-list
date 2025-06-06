import cn from 'classnames';
import DeleteIcon from "../CustomizableImages/DeleteIcon";

const DeleteButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className={cn('button__icon', 'button__icon--delete')}
    >
      <DeleteIcon />
    </button>
  );
};

export default DeleteButton;
