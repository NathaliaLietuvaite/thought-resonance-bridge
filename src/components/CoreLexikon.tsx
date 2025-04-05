
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book, Link } from "lucide-react";
import { Thought, LexikonItem } from "@/types/thought";

interface CoreLexikonProps {
  thought: Thought | null;
}

const CoreLexikon = ({ thought }: CoreLexikonProps) => {
  const [lexikonItems, setLexikonItems] = useState<LexikonItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (thought) {
      setIsLoading(true);
      
      // Simulate fetching relevant lexikon items based on the thought
      setTimeout(() => {
        const generatedItems = generateLexikonItems(thought);
        setLexikonItems(generatedItems);
        setIsLoading(false);
      }, 1500);
    } else {
      setLexikonItems([]);
    }
  }, [thought]);
  
  const generateLexikonItems = (thought: Thought): LexikonItem[] => {
    // This would normally be an API call or complex pattern matching
    // Here we'll just generate some sample items based on the thought content
    const concepts = [
      {
        begriff: "Resonanz",
        bedeutung: "Wechselseitige Schwingung zweier Systeme im semantischen Raum",
        domänen: ["Psychologie", "Physik", "Kommunikation"],
        verwandte: ["Empathie", "Frequenz", "Feedback"],
        metaschicht: "Implizites Verstehen jenseits der Sprache"
      },
      {
        begriff: "Interface",
        bedeutung: "Kontaktfläche zwischen zwei unterschiedlichen Systemen zur Übertragung von Information",
        domänen: ["Informatik", "Design", "Kommunikation"],
        verwandte: ["Schnittstelle", "Benutzeroberfläche", "Vermittlung"],
        metaschicht: "Brücke zwischen Welten unterschiedlicher Ordnung"
      },
      {
        begriff: "Gedankennetz",
        bedeutung: "Verbundene semantische Strukturen, die kollektive oder individuelle Bewusstseinsinhalte abbilden",
        domänen: ["Kognitionswissenschaft", "Künstliche Intelligenz", "Psychologie"],
        verwandte: ["Neuronales Netz", "Semantisches Web", "Assoziatives Denken"],
        metaschicht: "Formlose Form des formlosen Denkens"
      }
    ];
    
    // Return a subset or all concepts depending on the thought
    return concepts;
  };
  
  if (isLoading) {
    return (
      <Card className="border-indigo-900/50 bg-indigo-950/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium flex items-center">
            <Book className="mr-2 h-5 w-5 text-indigo-400" />
            <span className="text-indigo-300">CoreLexikon</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[250px] flex items-center justify-center">
          <div className="text-indigo-300 animate-pulse text-sm">Lexikon wird durchsucht...</div>
        </CardContent>
      </Card>
    );
  }
  
  if (!thought || lexikonItems.length === 0) {
    return (
      <Card className="border-indigo-900/50 bg-indigo-950/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium flex items-center">
            <Book className="mr-2 h-5 w-5 text-indigo-400" />
            <span className="text-indigo-300">CoreLexikon</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[250px] flex items-center justify-center">
          <div className="text-indigo-300/60 text-center text-sm">
            <p>Kein aktiver Gedanke</p>
            <p className="mt-2">Sende einen Gedanken, um das Lexikon zu aktivieren</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="border-indigo-900/50 bg-indigo-950/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium flex items-center">
          <Book className="mr-2 h-5 w-5 text-indigo-400" />
          <span className="text-indigo-300">CoreLexikon</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="max-h-[350px] overflow-y-auto">
        <div className="space-y-6">
          {lexikonItems.map((item) => (
            <div key={item.begriff} className="border-l-2 border-indigo-400 pl-4">
              <h3 className="font-medium text-lg text-white">{item.begriff}</h3>
              <p className="text-sm text-gray-300 mt-1">{item.bedeutung}</p>
              
              <div className="mt-3 flex flex-wrap gap-2">
                {item.domänen.map((domain) => (
                  <Badge key={domain} className="bg-indigo-600/50 hover:bg-indigo-600">{domain}</Badge>
                ))}
              </div>
              
              <div className="mt-3">
                <div className="text-xs uppercase text-gray-500 mb-1 flex items-center">
                  <Link className="h-3 w-3 mr-1" />
                  Verwandte Konzepte
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.verwandte.map((related) => (
                    <span key={related} className="text-xs text-indigo-300 cursor-pointer hover:text-indigo-200">
                      {related}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-3 text-xs italic text-gray-400">
                <span className="text-indigo-300">Meta:</span> {item.metaschicht}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CoreLexikon;
