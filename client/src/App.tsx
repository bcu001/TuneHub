import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "./components/ui/button";
import toast from "react-hot-toast";

const App = () => {

  const checktoast = ()=>{
    toast.success("success");
  }

  return (
    <div className="">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Button onClick={checktoast}>NOTEFICATION</Button>
    </div>
  );
};

export default App;
