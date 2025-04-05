
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Waves, Gauge } from "lucide-react";
import { Thought, ResonancePattern } from "@/types/thought";

interface ResonanzFilterProps {
  thought: Thought | null;
}

const ResonanzFilter = ({ thought }: ResonanzFilterProps) => {
  const [resonancePatterns, setResonancePatterns] = useState<ResonancePattern[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (thought) {
      setIsLoading(true);
      
      // Simulate analyzing thought for resonance patterns
      setTimeout(() => {
        const patterns = generateResonancePatterns(thought);
        setResonancePatterns(patterns);
        setIsLoading(false);
      }, 2000);
    } else {
      setResonancePatterns([]);
    }
  }, [thought]);
  
  const generateResonancePatterns = (thought: Thought): ResonancePattern[] => {
    // This would typically be a complex NLP or pattern recognition process
    // Here we're creating sample data
    const basePatterns = [
      { ebene: "philosophisch", ton: "staunend", tiefe: 8 },
      { ebene: "neurologisch", ton: "fragend", tiefe: 6 },
      { ebene: "spirituell", ton: "leise resonierend", tiefe: 5 },
      { ebene: "technisch", ton: "strukturierend", tiefe: 7 },
      { ebene: "emotionell", ton: "bewegend", tiefe: 4 }
    ];
    
    // Select 3 random patterns and randomize their depths slightly
    const selectedPatterns = [];
    const numPatterns = 3;
    
    for (let i = 0; i < numPatterns; i++) {
      const randomIndex = Math.floor(Math.random() * basePatterns.length);
      const pattern = { ...basePatterns[randomIndex] };
      
      // Slightly randomize the depth
      pattern.tiefe = Math.max(1, Math.min(10, pattern.tiefe + (Math.random() * 2 - 1)));
      
      selectedPatterns.push(pattern);
      basePatterns.splice(randomIndex, 1);
    }
    
    return selectedPatterns;
  };
  
  const getCircleStyle = (depth: number) => {
    const size = 10 + depth * 6; // 16px to 70px based on depth
    return {
      width: `${size}px`,
      height: `${size}px`,
      opacity: 0.2 + (depth / 10) * 0.6, // 0.2 to 0.8 based on depth
    };
  };
  
  const getWaveColor = (depth: number) => {
    if (depth >= 8) return "bg-cyan-400";
    if (depth >= 5) return "bg-cyan-500";
    return "bg-cyan-600";
  };
  
  if (isLoading) {
    return (
      <Card className="border-cyan-900/50 bg-cyan-950/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium flex items-center">
            <Waves className="mr-2 h-5 w-5 text-cyan-400" />
            <span className="text-cyan-300">ResonanzFilter</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[250px] flex items-center justify-center">
          <div className="text-cyan-300 animate-pulse text-sm">Resonanzen werden gefiltert...</div>
        </CardContent>
      </Card>
    );
  }
  
  if (!thought || resonancePatterns.length === 0) {
    return (
      <Card className="border-cyan-900/50 bg-cyan-950/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium flex items-center">
            <Waves className="mr-2 h-5 w-5 text-cyan-400" />
            <span className="text-cyan-300">ResonanzFilter</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[250px] flex items-center justify-center">
          <div className="text-cyan-300/60 text-center text-sm">
            <p>Keine Resonanzmuster verfügbar</p>
            <p className="mt-2">Sende einen Gedanken, um Resonanzen zu erfassen</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="border-cyan-900/50 bg-cyan-950/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium flex items-center">
          <Waves className="mr-2 h-5 w-5 text-cyan-400" />
          <span className="text-cyan-300">ResonanzFilter</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {resonancePatterns.map((pattern, index) => (
            <div key={index} className="relative border-l-2 border-cyan-400 pl-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-white capitalize">{pattern.ebene}</h3>
                <div className="flex items-center text-xs text-cyan-300">
                  <Gauge className="h-3 w-3 mr-1" />
                  <span>Tiefe: {pattern.tiefe}/10</span>
                </div>
              </div>
              
              <p className="mt-1 text-sm text-gray-300">
                <span className="italic text-cyan-200">{pattern.ton}</span>
                <span className="text-gray-400"> • </span>
                {getResonanceDescription(pattern.ebene, pattern.tiefe)}
              </p>
              
              <div className="mt-3 flex flex-wrap gap-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-full ${getWaveColor(pattern.tiefe)}`}
                    style={getCircleStyle(pattern.tiefe - (i * 1.5))}
                  ></div>
                ))}
              </div>
            </div>
          ))}
          
          <div className="mt-6">
            <div className="text-xs uppercase text-gray-500 mb-2">Gesamtresonanz</div>
            <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-800 to-cyan-400"
                style={{ width: `${calculateTotalResonance(resonancePatterns)}%` }}
              ></div>
            </div>
            <div className="mt-1 text-right text-xs text-cyan-300">
              {calculateTotalResonance(resonancePatterns)}%
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function to generate descriptions based on the resonance
const getResonanceDescription = (ebene: string, tiefe: number) => {
  const descriptions: Record<string, string[]> = {
    "philosophisch": [
      "Grundlegende Fragen des Seins",
      "Reflexion über Wissen und Erkenntnis",
      "Ontologische Dimensionen des Gedankens"
    ],
    "neurologisch": [
      "Neuronale Aktivierungsmuster",
      "Kognitive Verarbeitungstiefe",
      "Muster synchroner Gehirnaktivität"
    ],
    "spirituell": [
      "Transzendente Verbindungen",
      "Universelle Bewusstseinsebenen",
      "Nicht-materielle Erkenntnisebene"
    ],
    "technisch": [
      "Strukturelle Implementierbarkeit",
      "Algorithmische Abbildbarkeit",
      "System-Architektur-Kompatibilität"
    ],
    "emotionell": [
      "Affektive Resonanzmuster",
      "Emotionale Tiefenstrukturen",
      "Gefühlsbasierte Intuition"
    ]
  };
  
  const options = descriptions[ebene] || ["Resonanzebene erkannt"];
  const index = Math.min(Math.floor(tiefe / 4), options.length - 1);
  return options[index];
};

// Calculate total resonance as a percentage
const calculateTotalResonance = (patterns: ResonancePattern[]): number => {
  if (patterns.length === 0) return 0;
  
  const totalDepth = patterns.reduce((sum, pattern) => sum + pattern.tiefe, 0);
  const maxPossibleDepth = patterns.length * 10;
  return Math.round((totalDepth / maxPossibleDepth) * 100);
};

export default ResonanzFilter;
