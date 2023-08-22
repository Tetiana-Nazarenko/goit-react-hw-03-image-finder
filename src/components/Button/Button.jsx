import { ButtonLoad } from './Button.styled';

export const Button = ({ onClick }) => {
  return (
    <div>
      <ButtonLoad type="button" onClick={onClick}>
        Load more
      </ButtonLoad>
    </div>
  );
};
