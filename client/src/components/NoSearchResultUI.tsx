import { Button } from './ui/button';

interface NoSearchResultUIProps {
  reset: () => void;
}

const NoSearchResultUI = ({ reset }: NoSearchResultUIProps) => {
  return (
    <div className="grid place-items-center rounded-xl border border-dashed py-20 text-center">
      <div>
        <p className="text-5xl">🫥</p>
        <h3 className="mt-3 font-semibold">Nothing found</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Try a different search term or clear the category filter.
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={() => reset()}
        >
          Clear filters
        </Button>
      </div>
    </div>
  );
};

export default NoSearchResultUI;
