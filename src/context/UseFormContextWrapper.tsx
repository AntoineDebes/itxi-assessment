import { useForm, FormProvider } from "react-hook-form";
import { Outlet } from "react-router-dom";
import { ReactFCC } from "src/types/react";
interface UseFormContextWrapperProps {}

const UseFormContextWrapper: ReactFCC<UseFormContextWrapperProps> = ({
  children,
}) => {
  const methods = useForm({
    mode: "all",
    shouldFocusError: true,
    shouldUnregister: true,
  });
  return (
    <FormProvider {...methods}>
      {children} <Outlet />
    </FormProvider>
  );
};

export default UseFormContextWrapper;
