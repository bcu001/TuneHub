import { AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';

interface Props {
  message: string;
  onRetry: () => Promise<unknown>;
}

const ApiErrorUI = (props: Props) => {
  return (
    <div className="grid place-items-center gap-4 rounded-xl border border-dashed border-destructive/30 bg-destructive/5 py-16 text-center">
      <AlertCircle className="size-8 text-destructive/70" />
      <p className="max-w-sm text-sm text-destructive">{props.message}</p>
      {props.onRetry && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={props.onRetry}
        >
          Try again
        </Button>
      )}
    </div>
  );
};

export default ApiErrorUI;
