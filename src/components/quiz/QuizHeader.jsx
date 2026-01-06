import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const QuizHeader = ({ title, timeLeft, totalTime }) => {
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  return (
    <Card className="p-4 mb-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">{title}</h1>

        <Badge variant="destructive">
          ⏱ {Math.floor(timeLeft / 60)}:
          {String(timeLeft % 60).padStart(2, "0")}
        </Badge>
      </div>

      <Progress value={progress} className="mt-3" />
    </Card>
  );
};

export default QuizHeader;
