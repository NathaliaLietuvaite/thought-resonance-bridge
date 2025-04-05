
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Thought } from "@/types/thought";
import { useToast } from "@/hooks/use-toast";
import { Brain, Waves } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface ThoughtInputProps {
  onThoughtChange: (thought: Thought | null) => void;
}

export const ThoughtInput = ({ onThoughtChange }: ThoughtInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [pulseEffect, setPulseEffect] = useState(false);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!inputValue.trim()) {
      toast({
        title: "Gedanke fehlt",
        description: "Bitte formuliere deinen Gedanken",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setPulseEffect(true);

    // Simulate processing delay
    setTimeout(() => {
      const newThought: Thought = {
        id: uuidv4(),
        content: inputValue,
        timestamp: Date.now(),
        resonanceLevel: Math.random() * 8 + 2, // 2-10 range
        semanticFields: generateSemanticFields(inputValue),
      };
      
      onThoughtChange(newThought);
      setIsProcessing(false);
      
      toast({
        title: "Gedanke erfasst",
        description: "Dein Gedanke wird nun durch die Resonanzmatrix verarbeitet",
      });
    }, 2000);
  };

  const generateSemanticFields = (input: string) => {
    const allFields = [
      "Bewusstsein", "Kognition", "Philosophie", "Technik", 
      "Kommunikation", "Spiritualität", "Wissenschaft", "Kunst",
      "Ethik", "Mathematik", "Biologie", "Systeme", "Intuition"
    ];
    
    // Simple algorithm to select semantic fields based on input length and content
    const numFields = Math.max(1, Math.min(5, Math.floor(input.length / 20)));
    const selectedFields = [];
    
    for (let i = 0; i < numFields; i++) {
      const randomIndex = Math.floor(Math.random() * allFields.length);
      if (!selectedFields.includes(allFields[randomIndex])) {
        selectedFields.push(allFields[randomIndex]);
      }
    }
    
    return selectedFields;
  };

  // Reset pulse effect
  useEffect(() => {
    if (pulseEffect) {
      const timer = setTimeout(() => setPulseEffect(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [pulseEffect]);

  return (
    <Card className="border-gray-700 bg-gray-800/70 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="mb-4">
          <label htmlFor="thought-input" className="block text-lg font-medium mb-2 text-gray-200">
            Gib deinen Gedanken ein
          </label>
          <Textarea
            id="thought-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Was denkst du? Was beschäftigt dich? Formuliere es in Worten..."
            className="min-h-[120px] bg-gray-900/80 border-gray-700 text-white placeholder:text-gray-400"
            disabled={isProcessing}
          />
        </div>
        <div className="flex items-center text-sm text-gray-400">
          <Waves className="mr-2 h-4 w-4" />
          <p>Das System erfasst semantische Bedeutungen und Resonanzmuster</p>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-end gap-4 px-6 pb-6">
        <Button 
          variant="outline"
          onClick={() => {
            setInputValue("");
            onThoughtChange(null);
          }}
          disabled={isProcessing}
          className="border-gray-700 hover:bg-gray-700 text-gray-300"
        >
          Zurücksetzen
        </Button>
        
        <Button
          onClick={handleSubmit}
          disabled={isProcessing}
          className={`relative ${isProcessing ? 'bg-indigo-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
        >
          {pulseEffect && (
            <span className="absolute inset-0 rounded-md animate-ping bg-indigo-400 opacity-50"></span>
          )}
          <Brain className="mr-2 h-4 w-4" />
          {isProcessing ? "Gedanke wird verarbeitet..." : "Gedanken senden"}
        </Button>
      </CardFooter>
    </Card>
  );
};
