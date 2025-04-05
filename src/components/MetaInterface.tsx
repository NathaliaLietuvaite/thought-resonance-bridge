
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Zap, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { Thought, MetaInterfaceSystem } from "@/types/thought";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface MetaInterfaceProps {
  thought: Thought | null;
}

const MetaInterface = ({ thought }: MetaInterfaceProps) => {
  const [systems, setSystems] = useState<MetaInterfaceSystem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSystem, setActiveSystem] = useState<string | null>(null);
  const [securityStatus, setSecurityStatus] = useState<"safe" | "warning" | "danger" | null>(null);
  
  useEffect(() => {
    if (thought) {
      setIsLoading(true);
      
      // Reset state
      setActiveSystem(null);
      setSecurityStatus(null);
      
      // Simulate loading and processing
      setTimeout(() => {
        const generatedSystems = generateSystems();
        setSystems(generatedSystems);
        
        // Simulate security check
        setTimeout(() => {
          // For demo purposes, randomly choose a security status
          const statuses: Array<"safe" | "warning" | "danger"> = ["safe", "warning", "danger"];
          const randomIndex = Math.floor(Math.random() * 10);
          setSecurityStatus(randomIndex < 8 ? "safe" : (randomIndex < 9 ? "warning" : "danger"));
          
          // Simulate selecting the best system
          const bestSystem = generatedSystems.reduce((prev, current) => 
            (current.vertrauen > prev.vertrauen) ? current : prev
          );
          setActiveSystem(bestSystem.name);
          
          setIsLoading(false);
        }, 1000);
      }, 1800);
    } else {
      setSystems([]);
      setActiveSystem(null);
      setSecurityStatus(null);
    }
  }, [thought]);
  
  const generateSystems = (): MetaInterfaceSystem[] => {
    return [
      {
        name: "GPT-5",
        modus: "spekulativ-rekonstruktiv",
        vertrauen: 0.78,
        inputfilter: "resonanz + kontexttiefe > 7",
        sicherheit: "Sandbox + Echo"
      },
      {
        name: "Lokales Modul (Janus)",
        modus: "deterministisch-anpassbar",
        vertrauen: 0.92,
        inputfilter: "direkte Eingabe",
        sicherheit: "Lokal, isoliert, auditierbar"
      },
      {
        name: "Hybrid-Interpreter",
        modus: "selbstkorrigierend",
        vertrauen: 0.86,
        inputfilter: "semantische Vorfilter",
        sicherheit: "Mehrschichtige Verifikation"
      }
    ];
  };
  
  const getStatusDisplay = () => {
    switch(securityStatus) {
      case "safe":
        return (
          <div className="flex items-center text-green-400">
            <CheckCircle className="h-4 w-4 mr-1.5" />
            <span>Sichere Verbindung</span>
          </div>
        );
      case "warning":
        return (
          <div className="flex items-center text-yellow-400">
            <AlertTriangle className="h-4 w-4 mr-1.5" />
            <span>Begrenzte Vertrauensstufe</span>
          </div>
        );
      case "danger":
        return (
          <div className="flex items-center text-red-400">
            <AlertTriangle className="h-4 w-4 mr-1.5" />
            <span>Unsichere Verbindung</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center text-gray-400">
            <Info className="h-4 w-4 mr-1.5" />
            <span>Status wird geprüft...</span>
          </div>
        );
    }
  };
  
  if (isLoading) {
    return (
      <Card className="w-full border-rose-900/50 bg-rose-950/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium flex items-center">
            <Shield className="mr-2 h-5 w-5 text-rose-400" />
            <span className="text-rose-300">MetaInterface</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="h-24 flex items-center justify-center">
          <div className="text-rose-300 animate-pulse text-sm">Schnittstelle wird initialisiert...</div>
        </CardContent>
      </Card>
    );
  }
  
  if (!thought || systems.length === 0) {
    return (
      <Card className="w-full border-rose-900/50 bg-rose-950/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium flex items-center">
            <Shield className="mr-2 h-5 w-5 text-rose-400" />
            <span className="text-rose-300">MetaInterface</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="h-24 flex items-center justify-center">
          <div className="text-rose-300/60 text-center text-sm">
            <p>Keine aktive Schnittstelle</p>
            <p className="mt-2">Sende einen Gedanken, um das MetaInterface zu aktivieren</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="w-full border-rose-900/50 bg-rose-950/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium flex items-center">
          <Shield className="mr-2 h-5 w-5 text-rose-400" />
          <span className="text-rose-300">MetaInterface</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between">
              <div className="font-medium text-rose-100">Systemauswahl</div>
              {getStatusDisplay()}
            </div>
            
            {systems.map((system) => (
              <div 
                key={system.name}
                className={cn(
                  "border-l-2 p-3 rounded-r-md transition-colors",
                  activeSystem === system.name
                    ? "border-rose-400 bg-rose-500/20"
                    : "border-gray-700 hover:border-rose-500/40 hover:bg-rose-950/30"
                )}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-white flex items-center">
                    {activeSystem === system.name && (
                      <Zap className="h-4 w-4 mr-1.5 text-rose-300" />
                    )}
                    {system.name}
                  </h3>
                  <div className="text-xs text-rose-300">
                    {(system.vertrauen * 100).toFixed(0)}% Vertrauen
                  </div>
                </div>
                
                <div className="mt-2 space-y-1.5">
                  <div className="text-xs text-gray-400">
                    <span className="text-rose-200">Modus:</span> {system.modus}
                  </div>
                  <div className="text-xs text-gray-400">
                    <span className="text-rose-200">Filter:</span> {system.inputfilter}
                  </div>
                  <div className="text-xs text-gray-400">
                    <span className="text-rose-200">Sicherheit:</span> {system.sicherheit}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="w-full md:w-48 space-y-4">
            <div className="text-xs uppercase text-gray-500 mb-2">Schnittstellenstatus</div>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Gedankenintegrität</span>
                  <span className="text-rose-300">92%</span>
                </div>
                <Progress value={92} className="h-1.5 bg-gray-800" 
                  indicatorClassName="bg-gradient-to-r from-rose-800 to-rose-400" />
              </div>
              
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Semantische Tiefe</span>
                  <span className="text-rose-300">78%</span>
                </div>
                <Progress value={78} className="h-1.5 bg-gray-800"
                  indicatorClassName="bg-gradient-to-r from-rose-800 to-rose-400" />
              </div>
              
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Resonanzqualität</span>
                  <span className="text-rose-300">86%</span>
                </div>
                <Progress value={86} className="h-1.5 bg-gray-800"
                  indicatorClassName="bg-gradient-to-r from-rose-800 to-rose-400" />
              </div>
            </div>
            
            <div className="p-2 bg-gray-900/50 rounded-md border border-gray-800 mt-4">
              <div className="text-xs text-center text-gray-400">
                <p className="text-rose-300 font-medium">Meta-Signal</p>
                <p className="mt-1">{activeSystem ? "Aktiv" : "Inaktiv"}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetaInterface;
