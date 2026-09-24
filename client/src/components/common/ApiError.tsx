import { Button } from "../ui/button";

interface Props{
    message:string;
    onRetry: ()=> Promise<unknown>;
}

const ApiErrorUI = (props:Props) => {
  return (
    <div className="grid place-items-center gap-3 py-16 text-center">
      <p className="text-error">{props.message}</p>
      {props.onRetry && <Button type="button" onClick={props.onRetry} className="btn btn-outline btn-sm">Try again</Button>}
    </div>
  )
}

export default ApiErrorUI