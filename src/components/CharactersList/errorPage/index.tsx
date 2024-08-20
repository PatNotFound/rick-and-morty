import NotFoundImage from '../../../images/notFound.png';

const ErrorPage = ({ error }: { error: string }) => {
  console.error(error);

  return (
    <div
      className="flex w-full items-center	justify-center"
      data-testid="error-message"
    >
      <img src={NotFoundImage} className="max-h-md max-w-md" />
    </div>
  );
};

export default ErrorPage;
