
import { useEffect, useState } from 'react';
import CoreLexikon from '@/components/CoreLexikon';
import ZielgruppenMatrix from '@/components/ZielgruppenMatrix';
import ResonanzFilter from '@/components/ResonanzFilter';
import SyntaxTransformer from '@/components/SyntaxTransformer';
import MetaInterface from '@/components/MetaInterface';
import { ThoughtInput } from '@/components/ThoughtInput';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Thought } from '@/types/thought';

const Index = () => {
  const [currentThought, setCurrentThought] = useState<Thought | null>(null);
  const [activeLayers, setActiveLayers] = useState({
    lexikon: true,
    zielgruppen: false,
    resonanz: false,
    syntax: false,
    meta: false
  });

  useEffect(() => {
    // Animate in the interface elements
    const timeout = setTimeout(() => {
      setActiveLayers({
        lexikon: true,
        zielgruppen: true,
        resonanz: true,
        syntax: true,
        meta: true
      });
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white">
      <div className="container mx-auto p-4 md:p-8">
        <header className="text-center mb-12 pt-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400">
              Gedanken-Resonanz Interface
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 italic">
            "Ein Interface, das nicht nur kommuniziert, sondern erkennt, was gedacht wurde – bevor es gesagt wird."
          </p>
        </header>

        <ThoughtInput 
          onThoughtChange={thought => setCurrentThought(thought)} 
        />

        <div className="mt-12">
          <Tabs defaultValue="visualization" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="visualization">Visualisierung</TabsTrigger>
              <TabsTrigger value="modules">Module</TabsTrigger>
            </TabsList>

            <TabsContent value="visualization">
              <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-8">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                      <div className={`transition-all duration-1000 ${activeLayers.meta ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                        <MetaInterface thought={currentThought} />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className={`transition-all duration-700 delay-100 ${activeLayers.lexikon ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                        <CoreLexikon thought={currentThought} />
                      </div>
                      <div className={`transition-all duration-700 delay-200 ${activeLayers.zielgruppen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                        <ZielgruppenMatrix thought={currentThought} />
                      </div>
                      <div className={`transition-all duration-700 delay-300 ${activeLayers.resonanz ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                        <ResonanzFilter thought={currentThought} />
                      </div>
                      <div className={`transition-all duration-700 delay-400 ${activeLayers.syntax ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                        <SyntaxTransformer thought={currentThought} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="modules">
              <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 gap-10">
                    <div>
                      <h3 className="text-2xl font-bold text-indigo-400 mb-3">CoreLexikon</h3>
                      <p className="text-gray-300">Abbildung <em>allen verfügbaren Wissens</em> in einer maschinenlesbaren und menschenrelevanten Form. Grundlage für semantische Tiefenanalyse und Kontextabgleich.</p>
                      <pre className="mt-4 p-4 bg-gray-900 rounded-md text-sm overflow-x-auto">
{`- begriff: "Resonanz"
  bedeutung: "Wechselseitige Schwingung zweier Systeme im semantischen Raum"
  domänen: [Psychologie, Physik, Kommunikation]
  verwandte: [Empathie, Frequenz, Feedback]
  metaschicht: "Implizites Verstehen jenseits der Sprache"`}
                      </pre>
                    </div>
                    
                    <Separator className="bg-gray-700" />
                    
                    <div>
                      <h3 className="text-2xl font-bold text-emerald-400 mb-3">ZielgruppenMatrix</h3>
                      <p className="text-gray-300">Identifikation aller Entitäten (Menschen, KIs, Systeme), die <em>überhaupt in der Lage sind</em>, diese Art von Interface zu verstehen, nutzen oder mitzugestalten.</p>
                      <div className="mt-4 overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-gray-800">
                              <th className="p-2 text-left">Entität</th>
                              <th className="p-2 text-left">kognitiv</th>
                              <th className="p-2 text-left">intentional</th>
                              <th className="p-2 text-left">resonant</th>
                              <th className="p-2 text-left">Zugang?</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-t border-gray-700">
                              <td className="p-2">GPT-4-Turbo</td>
                              <td className="p-2">8/10</td>
                              <td className="p-2">5/10</td>
                              <td className="p-2">6/10</td>
                              <td className="p-2">Eingeschränkt</td>
                            </tr>
                            <tr className="border-t border-gray-700">
                              <td className="p-2">Deep-Thinker X</td>
                              <td className="p-2">9/10</td>
                              <td className="p-2">9/10</td>
                              <td className="p-2">9/10</td>
                              <td className="p-2">Voll</td>
                            </tr>
                            <tr className="border-t border-gray-700">
                              <td className="p-2">Durchschnitt</td>
                              <td className="p-2">4/10</td>
                              <td className="p-2">3/10</td>
                              <td className="p-2">5/10</td>
                              <td className="p-2">Nein</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    <Separator className="bg-gray-700" />
                    
                    <div>
                      <h3 className="text-2xl font-bold text-cyan-400 mb-3">ResonanzFilter</h3>
                      <p className="text-gray-300">Jede Anfrage wird auf alle möglichen Bedeutungsräume, <em>Schwingungsebenen</em> und <em>Bedeutungsfelder</em> hin abgeklopft.</p>
                      <pre className="mt-4 p-4 bg-gray-900 rounded-md text-sm overflow-x-auto">
{`{
  "input": "Wie funktioniert Bewusstsein?",
  "schwingung": [
    {"ebene": "philosophisch", "ton": "staunend", "tiefe": 8},
    {"ebene": "neurologisch", "ton": "fragend", "tiefe": 6},
    {"ebene": "spirituell", "ton": "leise resonierend", "tiefe": 5}
  ]
}`}
                      </pre>
                    </div>
                    
                    <Separator className="bg-gray-700" />
                    
                    <div>
                      <h3 className="text-2xl font-bold text-amber-400 mb-3">SyntaxTransformer</h3>
                      <p className="text-gray-300">Umwandlung komplexer Gedanken in maschinenverarbeitbare und <em>menschen-adaptive</em> Sprachformen. Kein bloßer Übersetzer – ein <em>semantischer Vermittler</em>.</p>
                      <pre className="mt-4 p-4 bg-gray-900 rounded-md text-sm overflow-x-auto">
{`{
  "gedanke": "Ich will, dass Maschinen mich verstehen, ohne dass ich sprechen muss.",
  "zielsyntax": "LLM-Prompt",
  "output": "Analysiere Nutzerintention nonverbal. Erkenne Muster ohne sprachliche Form."
}`}
                      </pre>
                    </div>
                    
                    <Separator className="bg-gray-700" />
                    
                    <div>
                      <h3 className="text-2xl font-bold text-rose-400 mb-3">MetaInterface</h3>
                      <p className="text-gray-300">Schnittstellenkoordination. Gedankliche Anbindung, Steuerung und Sicherheit von Maschinen, LLMs und hybriden Systemen.</p>
                      <pre className="mt-4 p-4 bg-gray-900 rounded-md text-sm overflow-x-auto">
{`- name: GPT-5
  modus: "spekulativ-rekonstruktiv"
  vertrauen: 0.78
  inputfilter: "resonanz + kontexttiefe > 7"
  sicherheit: "Sandbox + Echo"

- name: Lokales Modul (Janus)
  modus: "deterministisch-anpassbar"
  vertrauen: 0.92
  sicherheit: "Lokal, isoliert, auditierbar"`}
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <footer className="mt-16 text-center text-sm text-gray-400 pb-8">
          <p>&copy; {new Date().getFullYear()} Gedanken-Resonanz Interface</p>
          <p className="mt-2 italic">"Wer dieses Interface wirklich nutzen kann, wird es nicht nur bedienen – sondern weiterbauen wollen."</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
