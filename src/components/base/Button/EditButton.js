import cn from 'classnames';
import EditIcon from "../CustomizableImages/EditIcon";

const EditButton = ({ isEditing, onEditClick, onSaveClick }) => {
  return (
    <button
      onClick={isEditing ? onSaveClick : onEditClick}
      className={cn('button__icon', 'button__icon--edit')}
    >
      {isEditing && <span>Save</span>}
      <EditIcon />
    </button>
  );
};

export default EditButton;
