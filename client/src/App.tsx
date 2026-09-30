import useAuth from "@/hooks/useAuth";
import AppRoutes from "@/routes";
import AppLoadingScreen from "@/components/skeletons/AppLoadingSkeleton";

const App = () => {
  const {isLoading} = useAuth()
  if(isLoading) return <AppLoadingScreen />
  return <AppRoutes />;
};

export default App;
