
interface ErrorProps {
  data: any;
  error: string;
  global?: boolean;
}

function useHandleError() {
  // const intl = useIntl();
  const handleError = (data: ErrorProps) => {
    if (data.global && data.error) {
    }  
  
  };

  return [handleError];
}

export default useHandleError;
