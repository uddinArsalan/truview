import { useApp } from "../contexts/AppProvider";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";

const WelcomeMessage = () => {
  const { userData } = useApp();
  const userName = userData?.username?.split(" ")[0] || "User";

  return (
    <div className="max-w-2xl mx-auto mb-6 px-4">
      <div className="flex items-center gap-3 py-4 border-b">
        <Avatar className="h-12 w-12">
          <AvatarImage src={userData?.profile_picture || ""} alt={userName} />
          <AvatarFallback className="bg-primary/10">
            {userName[0]}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h1 className="text-lg font-medium">Welcome back, {userName}</h1>
          <p className="text-sm text-muted-foreground">
            What&apos; on your mind today?
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
