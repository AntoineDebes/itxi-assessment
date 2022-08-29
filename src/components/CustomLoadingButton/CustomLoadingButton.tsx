import { LoadingButton } from "@mui/lab";

interface CustomLoadingButtonProps {
  href?: string;
  component?: any;
  image?: string;
  imageAlt?: string;
  to?: string;
  label: string;
}

const CustomLoadingButton: React.FC<CustomLoadingButtonProps> = ({
  href,
  component,
  image,
  to,
  label,
  imageAlt,
}) => {
  return (
    <>
      <LoadingButton
        variant="outlined"
        sx={{
          minHeight: "3.5em",
        }}
        component={component}
        href={href}
        to={to}
        fullWidth
        endIcon={
          <img
            className="homepage__container__img"
            src={image}
            alt={imageAlt}
            width={80}
          />
        }
      >
        {label}
      </LoadingButton>
    </>
  );
};

export default CustomLoadingButton;
