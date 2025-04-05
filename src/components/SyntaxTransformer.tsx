
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, RefreshCw } from "lucide-react";
import { Thought, TransformedSyntax } from "@/types/thought";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

interface SyntaxTransformerProps {
  thought: Thought | null;
}

const SyntaxTransformer = ({ thought }: SyntaxTransformerProps) => {
  const [transformedSyntaxes, setTransformedSyntaxes] = useState<TransformedSyntax[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSyntax, setSelectedSyntax] = useState<string>("LLM-Prompt");
  
  useEffect(() => {
    if (thought) {
      setIsLoading(true);
      
      // Simulate transforming the thought into different syntaxes
      setTimeout(() => {
        const transformedSyntaxes = transformThought(thought);
        setTransformedSyntaxes(transformedSyntaxes);
        setIsLoading(false);
      }, 2500);
    } else {
      setTransformedSyntaxes([]);
    }
  }, [thought]);
  
  const transformThought = (thought: Thought): TransformedSyntax[] => {
    // This would typically involve complex NLP transformations
    // Here we're creating sample transformations
    return [
      {
        original: thought.content,
        transformed: `Analysiere Nutzerintention nonverbal. Erkenne Muster ohne sprachliche Form. Extrapoliere tiefe Strukturen aus: "${thought.content.substring(0, 30)}..."`,
        zielsyntax: "LLM-Prompt",
        confidence: 0.87
      },
      {
        original: thought.content,
        transformed: `function interpretThought(input) {\n  const semanticCore = extractCore(input);\n  const patterns = identifyPatterns(semanticCore);\n  return resonateWith(patterns);\n}`,
        zielsyntax: "Code",
        confidence: 0.72
      },
      {
        original: thought.content,
        transformed: `Die Idee eines Interfaces zwischen Gedanke und digitaler Form evoziert eine Brücke zwischen zwei Welten: der formfreien Intuition und der strukturierten Logik.`,
        zielsyntax: "Philosophisch",
        confidence: 0.93
      },
      {
        original: thought.content,
        transformed: `[Gedanke] ⟶ {Resonanzfilter} ⟶ [Strukturelle Abbildung] ⟶ {Syntaktische Transformation} ⟶ [Zielsystem]`,
        zielsyntax: "Visuell",
        confidence: 0.81
      }
    ];
  };
  
  const regenerateTransformation = () => {
    if (!thought) return;
    
    setIsLoading(true);
    
    // Simulate regenerating the transformation
    setTimeout(() => {
      const currentSyntaxIndex = transformedSyntaxes.findIndex(
        syntax => syntax.zielsyntax === selectedSyntax
      );
      
      if (currentSyntaxIndex >= 0) {
        const newSyntaxes = [...transformedSyntaxes];
        const currentSyntax = newSyntaxes[currentSyntaxIndex];
        
        // Create a slightly different version
        newSyntaxes[currentSyntaxIndex] = {
          ...currentSyntax,
          transformed: currentSyntax.transformed + " // Optimierte Version mit erhöhter semantischer Tiefe",
          confidence: Math.min(0.99, currentSyntax.confidence + 0.05)
        };
        
        setTransformedSyntaxes(newSyntaxes);
      }
      
      setIsLoading(false);
    }, 1500);
  };
  
  const getCurrentTransformation = (): TransformedSyntax | undefined => {
    return transformedSyntaxes.find(syntax => syntax.zielsyntax === selectedSyntax);
  };
  
  if (isLoading) {
    return (
      <Card className="border-amber-900/50 bg-amber-950/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium flex items-center">
            <Code className="mr-2 h-5 w-5 text-amber-400" />
            <span className="text-amber-300">SyntaxTransformer</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[250px] flex items-center justify-center">
          <div className="text-amber-300 animate-pulse text-sm">Syntax wird transformiert...</div>
        </CardContent>
      </Card>
    );
  }
  
  if (!thought || transformedSyntaxes.length === 0) {
    return (
      <Card className="border-amber-900/50 bg-amber-950/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium flex items-center">
            <Code className="mr-2 h-5 w-5 text-amber-400" />
            <span className="text-amber-300">SyntaxTransformer</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[250px] flex items-center justify-center">
          <div className="text-amber-300/60 text-center text-sm">
            <p>Keine Syntax-Transformation verfügbar</p>
            <p className="mt-2">Sende einen Gedanken, um Transformationen zu generieren</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="border-amber-900/50 bg-amber-950/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium flex items-center">
          <Code className="mr-2 h-5 w-5 text-amber-400" />
          <span className="text-amber-300">SyntaxTransformer</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs 
          value={selectedSyntax} 
          onValueChange={setSelectedSyntax}
          className="space-y-4"
        >
          <TabsList className="grid grid-cols-4 bg-amber-900/20">
            {transformedSyntaxes.map((syntax) => (
              <TabsTrigger 
                key={syntax.zielsyntax} 
                value={syntax.zielsyntax}
                className="data-[state=active]:bg-amber-800/50"
              >
                {syntax.zielsyntax}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {transformedSyntaxes.map((syntax) => (
            <TabsContent key={syntax.zielsyntax} value={syntax.zielsyntax}>
              <div className="space-y-4">
                <div className="rounded-md bg-gray-900/80 p-3 text-sm font-mono text-amber-100 overflow-x-auto">
                  {syntax.transformed}
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="text-gray-400">
                    <span className="text-amber-300">Konfidenz:</span> {(syntax.confidence * 100).toFixed(1)}%
                  </div>
                  
                  <Button 
                    onClick={regenerateTransformation}
                    size="sm"
                    variant="outline"
                    className="border-amber-700 bg-amber-900/30 hover:bg-amber-800/50 text-amber-300"
                  >
                    <RefreshCw className="h-3.5 w-3.5 mr-1" />
                    Neu generieren
                  </Button>
                </div>
              </div>
            </TabsContent>
          ))}
          
          <div className="mt-4 pt-4 border-t border-gray-800">
            <div className="text-xs uppercase text-gray-500 mb-2">Original-Gedanke</div>
            <div className="text-sm text-gray-300 italic">
              {thought?.content}
            </div>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SyntaxTransformer;
