import { Card } from "@/components/ui/card";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const QuestionCard = ({ question, index, selected, onSelect }) => {
  return (
    <Card className="p-5 mb-5">
      <h3 className="font-semibold mb-4">
        {index + 1}. {question.questionText}
      </h3>

      <RadioGroup
        value={selected ? selected.toString() : ""}
        onValueChange={(val) =>
          onSelect(question.id, Number(val))
        }
      >
        {question.options.map((opt) => (
          <div
            key={opt.id}
            className="flex items-center space-x-2 border rounded-md p-3 mb-2"
          >
            <RadioGroupItem
              value={opt.id.toString()}
              id={`opt-${opt.id}`}
            />
            <Label htmlFor={`opt-${opt.id}`}>
              {opt.optionText}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </Card>
  );
};

export default QuestionCard;
