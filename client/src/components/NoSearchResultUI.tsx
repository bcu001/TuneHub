
import type { UseFormReset } from "react-hook-form";
import { Button } from "./ui/button";
interface Inputs {
  q: string;
}

interface NoSearchResultUIProps {
  reset: UseFormReset<Inputs>;
}


const NoSearchResultUI = ({reset}:NoSearchResultUIProps) => {
  return (
    <div className="grid place-items-center rounded-box border border-dashed border-base-300 py-24 text-center">
      <div>
        <p className="text-5xl">🫥</p>
        <h3 className="mt-3 font-semibold">Nothing found</h3>
        <p className="mt-1 text-sm text-base-content/55">
          Try a different search term or clear the category filter.
        </p>
        <Button
          type="button"
          className="btn btn-primary btn-sm mt-4 rounded-full"
          onClick={()=>reset()}
        >
          Clear filters
        </Button>
      </div>
    </div>
  );
};

export default NoSearchResultUI;
