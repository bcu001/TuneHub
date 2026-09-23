
import { Link } from "react-router";
import { Button } from "../ui/button";

const NotFound = () => {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="text-sm font-medium text-muted-foreground mb-3">
          ERROR 404
        </p>

        <h1 className="text-6xl sm:text-7xl font-bold tracking-tight">
          Page not found
        </h1>

        <p className="mt-4 text-muted-foreground">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <div className="mt-8 flex justify-center gap-3">
          <Button asChild>
            <Link to="/">Go Home</Link>
          </Button>

          <Button variant="outline" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    </main>
  );
};

export default NotFound;

