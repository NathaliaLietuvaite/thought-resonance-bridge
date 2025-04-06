
import { useState } from "react";
import { Thought, simulateGedankenAnalyse, GedankenAnalyse } from "@/types/thought";
import { v4 as uuidv4 } from 'uuid';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Sparkles } from "lucide-react";

interface ThoughtInputProps {
  onThoughtChange: (thought: Thought) => void;
}

export const ThoughtInput = ({ onThoughtChange }: ThoughtInputProps) => {
  const [content, setContent] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyse, setAnalyse] = useState<GedankenAnalyse | null>(null);

  const submitThought = async () => {
    if (!content.trim()) {
      toast({
        title: "Gedanke fehlt",
        description: "Bitte gib einen Gedanken ein.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Simulate API call
      const gedankenAnalyse = await simulateGedankenAnalyse(content);
      setAnalyse(gedankenAnalyse);
      
      const thought: Thought = {
        id: uuidv4(),
        content,
        timestamp: Date.now(),
        resonanceLevel: gedankenAnalyse.resonanzfilter.gesamtresonanz,
        semanticFields: gedankenAnalyse.corelexikon.map(item => item.begriff),
        connections: gedankenAnalyse.corelexikon.flatMap(item => item.verwandte)
      };
      
      onThoughtChange(thought);
      toast({
        title: "Gedanke gesendet",
        description: "Dein Gedanke wird verarbeitet und analysiert.",
      });
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Bei der Verarbeitung des Gedankens ist ein Fehler aufgetreten.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 mb-2">
            Gedankeneingabe
          </h2>
          <Textarea
            placeholder="🧠 Gib deinen Gedanken ein..."
            className="min-h-32 bg-gray-900/70 border-gray-700 text-gray-100 placeholder:text-gray-500"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button 
            onClick={submitThought} 
            className="w-full bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700"
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <span className="flex items-center">
                <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                Gedanke wird analysiert...
              </span>
            ) : (
              <span className="flex items-center">
                <Sparkles className="h-4 w-4 mr-2" />
                Gedanken analysieren
              </span>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
