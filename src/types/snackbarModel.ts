export type SnackBarToasterModel = {
    message?: string;
    color?: string;
    severity?: "success" | "warning" | "error" | "info";
    open: boolean;
  }
  