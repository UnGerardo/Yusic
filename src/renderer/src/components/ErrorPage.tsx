import { useRouteError } from "react-router-dom"

const ErrorPage = (): JSX.Element => {
  const error = useRouteError() as any;
  console.log(error);

  return (
    <section>
      {error.statusText || error.message}
    </section>
  )
}

export default ErrorPage;