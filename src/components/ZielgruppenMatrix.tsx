
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Users, Check, X, AlertCircle } from "lucide-react";
import { Thought, ZielgruppeEntity } from "@/types/thought";

interface ZielgruppenMatrixProps {
  thought: Thought | null;
}

const ZielgruppenMatrix = ({ thought }: ZielgruppenMatrixProps) => {
  const [entities, setEntities] = useState<ZielgruppeEntity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (thought) {
      setIsLoading(true);
      
      // Simulate analyzing the thought for suitable entities
      setTimeout(() => {
        const generatedEntities = generateEntities();
        setEntities(generatedEntities);
        setIsLoading(false);
      }, 1700);
    } else {
      setEntities([]);
    }
  }, [thought]);
  
  const generateEntities = (): ZielgruppeEntity[] => {
    return [
      {
        name: "GPT-4-Turbo",
        kognitiv: 8,
        intentional: 5,
        resonant: 6,
        zugang: "Eingeschränkt"
      },
      {
        name: "Deep-Thinker X",
        kognitiv: 9,
        intentional: 9,
        resonant: 9,
        zugang: "Voll"
      },
      {
        name: "Durchschnitt",
        kognitiv: 4,
        intentional: 3,
        resonant: 5,
        zugang: "Nein"
      }
    ];
  };

  const getAccessIcon = (access: string) => {
    switch(access) {
      case "Voll":
        return <Check className="h-4 w-4 text-green-500" />;
      case "Eingeschränkt":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "Nein":
        return <X className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };
  
  if (isLoading) {
    return (
      <Card className="border-emerald-900/50 bg-emerald-950/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium flex items-center">
            <Users className="mr-2 h-5 w-5 text-emerald-400" />
            <span className="text-emerald-300">ZielgruppenMatrix</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[250px] flex items-center justify-center">
          <div className="text-emerald-300 animate-pulse text-sm">Entitäten werden analysiert...</div>
        </CardContent>
      </Card>
    );
  }
  
  if (!thought || entities.length === 0) {
    return (
      <Card className="border-emerald-900/50 bg-emerald-950/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium flex items-center">
            <Users className="mr-2 h-5 w-5 text-emerald-400" />
            <span className="text-emerald-300">ZielgruppenMatrix</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[250px] flex items-center justify-center">
          <div className="text-emerald-300/60 text-center text-sm">
            <p>Keine Zielgruppenanalyse verfügbar</p>
            <p className="mt-2">Sende einen Gedanken, um die Matrix zu aktivieren</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="border-emerald-900/50 bg-emerald-950/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium flex items-center">
          <Users className="mr-2 h-5 w-5 text-emerald-400" />
          <span className="text-emerald-300">ZielgruppenMatrix</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {entities.map((entity) => (
            <div key={entity.name} className="border-l-2 border-emerald-400 pl-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-white">{entity.name}</h3>
                <div className="flex items-center bg-gray-800 rounded-full px-2 py-0.5">
                  {getAccessIcon(entity.zugang)}
                  <span className="text-xs ml-1 text-gray-300">{entity.zugang}</span>
                </div>
              </div>
              
              <div className="mt-3 space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">Kognitiv</span>
                    <span className="text-emerald-300">{entity.kognitiv}/10</span>
                  </div>
                  <Progress value={entity.kognitiv * 10} className="h-2 bg-gray-800" 
                    indicatorClassName="bg-gradient-to-r from-emerald-800 to-emerald-400" />
                </div>
                
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">Intentional</span>
                    <span className="text-emerald-300">{entity.intentional}/10</span>
                  </div>
                  <Progress value={entity.intentional * 10} className="h-2 bg-gray-800"
                    indicatorClassName="bg-gradient-to-r from-emerald-800 to-emerald-400" />
                </div>
                
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">Resonant</span>
                    <span className="text-emerald-300">{entity.resonant}/10</span>
                  </div>
                  <Progress value={entity.resonant * 10} className="h-2 bg-gray-800"
                    indicatorClassName="bg-gradient-to-r from-emerald-800 to-emerald-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ZielgruppenMatrix;
