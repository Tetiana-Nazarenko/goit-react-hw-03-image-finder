import { Grid } from 'react-loader-spinner';
import { LodeWrapper } from './Loader.styled';

const Loader = () => {
  return (
    <LodeWrapper>
      <Grid
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </LodeWrapper>
  );
};
export default Loader;
