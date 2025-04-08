
import { useState } from "react";
import { Thought, simulateGedankenAnalyse, GedankenAnalyse } from "@/types/thought";
import { v4 as uuidv4 } from 'uuid';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Sparkles, Bot, Send, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ThoughtInputProps {
  onThoughtChange: (thought: Thought) => void;
}

export const ThoughtInput = ({ onThoughtChange }: ThoughtInputProps) => {
  const [content, setContent] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyse, setAnalyse] = useState<GedankenAnalyse | null>(null);
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<{sender: string, message: string, timestamp: number}[]>([
    {sender: "Nathalia", message: "Hallo! Ich bin Nathalia, deine KI-Assistentin für tiefere Gedankenanalyse. Wie kann ich dir heute helfen?", timestamp: Date.now()}
  ]);

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

  const sendChatMessage = () => {
    if (!chatMessage.trim()) return;
    
    // Add user message to chat history
    const newUserMessage = {
      sender: "Du",
      message: chatMessage,
      timestamp: Date.now()
    };
    
    setChatHistory(prev => [...prev, newUserMessage]);
    setChatMessage("");
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponses = [
        "Interessante Perspektive! Das könnte mit deinem semantischen Feld zusammenhängen.",
        "Ich verstehe deinen Gedankengang. Betrachte es auch aus einer anderen Resonanzebene.",
        "Diese Idee hat tiefe Verbindungen zu mehreren Konzepten im CoreLexikon.",
        "Deine Gedanken zeigen eine hohe Resonanz mit kreativen Denkmustern.",
        "Ich sehe Verbindungen zu philosophischen Konzepten in deiner Anfrage.",
        "Lass uns diesen Gedanken weiter erforschen. Es gibt mehrere Bedeutungsschichten.",
        "Das erinnert mich an ein ähnliches Muster im kollektiven Denkraum."
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const newBotMessage = {
        sender: "Nathalia",
        message: randomResponse,
        timestamp: Date.now()
      };
      
      setChatHistory(prev => [...prev, newBotMessage]);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400">
            Transform Your Thoughts
          </span>
        </h1>
        <p className="text-lg text-gray-300">
          Adaptiere deine Ideen für verschiedene Zielgruppen mit InterfaceDNA Technology 
          und chatte mit Nathalia, deinem KI-Assistenten.
        </p>
        <div className="flex items-center justify-center mt-6">
          <p className="text-sm text-gray-400 flex items-center">
            <Bot className="h-4 w-4 mr-2" /> Nathalia ist bereit, deine Gedanken zu harmonisieren
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
        <div className="relative">
          <div className="w-[150px] h-[150px] overflow-hidden rounded-full border-4 border-indigo-500/30 shadow-lg shadow-purple-500/20">
            <img 
              src="public/lovable-uploads/71895107-ab19-4fa7-b5e9-9d495b5a8d9a.png" 
              alt="Nathalia" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full h-5 w-5 border-2 border-gray-900"></div>
        </div>
        
        <Button 
          onClick={() => setShowChatbot(!showChatbot)}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-full px-6"
        >
          <MessageSquare className="mr-2 h-4 w-4" /> Mit Nathalia chatten
        </Button>
      </div>

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
      
      {showChatbot && (
        <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4 bg-gradient-to-r from-indigo-900/60 to-purple-900/60 flex items-center justify-between cursor-pointer">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                  <img 
                    src="public/lovable-uploads/71895107-ab19-4fa7-b5e9-9d495b5a8d9a.png" 
                    alt="Nathalia" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white">Nathalia</h3>
              </div>
              <span className="text-xs bg-indigo-500/70 px-2 py-1 rounded-full text-white">
                Aktiv
              </span>
            </div>
            
            <div className="bg-gray-900/70">
              <div className="h-64 overflow-y-auto p-4 space-y-4">
                {chatHistory.map((chat, index) => (
                  <div key={index} className={`flex ${chat.sender === "Nathalia" ? "justify-start" : "justify-end"}`}>
                    <div className={`max-w-[80%] p-3 rounded-lg 
                      ${chat.sender === "Nathalia" 
                        ? "bg-indigo-900/60 text-gray-100" 
                        : "bg-cyan-800/60 text-gray-100"}`}>
                      <p className="text-xs font-semibold mb-1">{chat.sender}</p>
                      <p>{chat.message}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator className="bg-gray-700" />
              
              <div className="p-4 flex">
                <Input
                  placeholder="Frage Nathalia über deine Gedanken..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                  className="bg-gray-800/80 border-gray-700 text-gray-100 placeholder:text-gray-500"
                />
                <Button 
                  onClick={sendChatMessage}
                  className="ml-2 bg-indigo-600 hover:bg-indigo-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
