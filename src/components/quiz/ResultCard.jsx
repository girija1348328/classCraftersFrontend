import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ResultCard = ({ result }) => {
  return (
    <Card className="p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">
        Quiz Result 🎉
      </h2>

      <p className="text-lg">Score: {result.score}</p>
      <p>Total Questions: {result.total}</p>
      <p>Percentage: {result.percentage}%</p>

      <Badge
        className="mt-4"
        variant={
          result.percentage >= 40
            ? "success"
            : "destructive"
        }
      >
        {result.percentage >= 40 ? "PASS" : "FAIL"}
      </Badge>
    </Card>
  );
};

export default ResultCard;
