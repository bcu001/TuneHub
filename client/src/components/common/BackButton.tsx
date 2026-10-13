import { Link } from 'react-router';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  text: string;
  link: string;
}

const BackButton = (props: BackButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="-ml-2 mb-1 gap-1.5 text-muted-foreground hover:text-foreground"
      asChild
    >
      <Link to={props.link}>
        <ArrowLeft className="size-4" />
        {props.text}
      </Link>
    </Button>
  );
};

export default BackButton;
