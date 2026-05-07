import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { ClipboardCopy, Sparkles, Trash2, Loader2, Info } from "lucide-react"
import { TrustBanner } from "@/components/TrustBanner"
import { History } from "@/components/History"
import { SkeletonLoader, Metrics } from "@/components/Metrics"

interface HistoryItem {
  id: string;
  original: string;
  humanized: string;
  timestamp: number;
  score?: number;
}

export default function App() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [currentScore, setCurrentScore] = useState<number | undefined>(undefined)

  // Load history from LocalStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('humanizer_history')
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory))
    }
  }, [])

  // Save history to LocalStorage
  const saveToHistory = (original: string, humanized: string, score?: number) => {
    const newItem: HistoryItem = {
      id: Math.random().toString(36).substr(2, 9),
      original,
      humanized,
      timestamp: Date.now(),
      score
    }
    const updatedHistory = [newItem, ...history].slice(0, 5) // Keep last 5
    setHistory(updatedHistory)
    localStorage.setItem('humanizer_history', JSON.stringify(updatedHistory))
  }

  const handleHumanize = async () => {
    if (!inputText.trim()) {
      toast.error("Please enter some text first")
      return
    }

    setIsLoading(true)
    setCurrentScore(undefined)
    setOutputText('')
    
    // Status message cycle
    const messages = [
      "Analyzing robotic patterns...",
      "Identifying robotic structures...",
      "Drafting humanized version...",
      "Refining academic nuances...",
      "Polishing final response..."
    ]
    let msgIndex = 0
    setStatusMessage(messages[0])
    
    const msgInterval = setInterval(() => {
      msgIndex = (msgIndex + 1) % messages.length
      setStatusMessage(messages[msgIndex])
    }, 2500)

    try {
      const response = await fetch('/api/humanize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText })
      })

      if (!response.ok) {
        if (response.status === 422) {
          throw new Error('SAFETY_BLOCKED')
        }
        throw new Error('FAILED')
      }

      const data = await response.json()
      setOutputText(data.output)
      setCurrentScore(data.humanityScore)
      saveToHistory(inputText, data.output, data.humanityScore)
      toast.success("Text humanized successfully!")
    } catch (error: any) {
      if (error.message === 'SAFETY_BLOCKED') {
        toast.error("The AI safety filters blocked this text. Please try revising.")
      } else {
        toast.error("Humanization failed. Please check your connection or try again.")
      }
      console.error(error)
    } finally {
      clearInterval(msgInterval)
      setIsLoading(false)
      setStatusMessage('')
    }
  }

  const handleSelectHistory = (item: HistoryItem) => {
    setInputText(item.original)
    setOutputText(item.humanized)
    setCurrentScore(item.score)
    toast.info("Restored from history")
  }

  const handleCopy = () => {
    if (!outputText) return
    navigator.clipboard.writeText(outputText)
    toast.success("Copied to clipboard!")
  }

  const handleClear = () => {
    if (inputText && !confirm("Are you sure you want to clear your input?")) return
    setInputText('')
    setOutputText('')
    setCurrentScore(undefined)
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/50 text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-2">
            <Sparkles className="h-3 w-3 text-slate-900" />
            <span>Academic Engine V1.2</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">Humanizer AI</h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base">
            Bypass AI detection with academic-grade humanization. Our engine injects burstiness and perplexity while maintaining scholarly rigor.
          </p>
        </header>

        {/* Main Tool */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Input Section */}
          <div className="space-y-6">
            <Card className="border-slate-200 shadow-sm overflow-hidden bg-white/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div className="space-y-1">
                  <CardTitle className="text-xl">Input Text</CardTitle>
                  <CardDescription>Enter AI-generated content to humanize.</CardDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleClear}
                  className="text-slate-400 hover:text-rose-600 transition-colors"
                  title="Clear input"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea 
                  placeholder="Paste your text here (e.g. Furthermore, it is important to note...)"
                  className="min-h-[400px] resize-none border-slate-200 focus-visible:ring-slate-900 bg-white"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
                
                <Metrics text={inputText} />

                <Button 
                  className="w-full bg-slate-900 text-white hover:bg-slate-800 h-12 text-base font-semibold shadow-lg shadow-slate-200 transition-all active:scale-[0.98]"
                  onClick={handleHumanize}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-3">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="animate-pulse">{statusMessage}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      <span>Humanize with Academic Precision</span>
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>
            
            <History items={history} onSelect={handleSelectHistory} />
          </div>

          {/* Output Section */}
          <div className="space-y-6 lg:sticky lg:top-8">
            <Card className="border-slate-200 shadow-xl bg-white overflow-hidden ring-1 ring-slate-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-slate-50">
                <div className="space-y-1">
                  <CardTitle className="text-xl">Humanized Result</CardTitle>
                  <CardDescription>Ready for submission or publication.</CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleCopy}
                  disabled={!outputText || isLoading}
                  className="border-slate-200 font-semibold"
                >
                  <ClipboardCopy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
              </CardHeader>
              <CardContent className="pt-6">
                {isLoading ? (
                  <div className="min-h-[445px]">
                    <SkeletonLoader />
                  </div>
                ) : outputText ? (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="min-h-[445px] p-6 rounded-xl bg-slate-50/50 border border-slate-100 text-slate-800 whitespace-pre-wrap leading-relaxed font-serif text-[15px]">
                      {outputText}
                    </div>
                    <Metrics text={outputText} score={currentScore} />
                  </div>
                ) : (
                  <div className="min-h-[445px] flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-100 rounded-xl bg-slate-50/30">
                    <div className="p-4 rounded-full bg-slate-100 mb-4">
                      <Sparkles className="h-8 w-8 opacity-20" />
                    </div>
                    <p className="font-semibold text-slate-500">Awaiting Input</p>
                    <p className="text-xs mt-1">Transform your draft into scholarly prose.</p>
                  </div>
                )}
                
                <TrustBanner />
                
                <div className="mt-4 p-3 rounded-lg bg-emerald-50 border border-emerald-100 flex gap-3 items-start">
                  <Info className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                  <p className="text-[11px] text-emerald-800 leading-normal">
                    <strong>Tip:</strong> Our engine uses Intellectual Hedging (e.g. "suggests", "implies") to mimic the natural caution found in peer-reviewed human writing.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer info */}
        <footer className="text-center py-12 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
          <p>© 2026 HUMANIZER AI ENGINE • ENCRYPTED END-TO-END • ACADEMIC COMPLIANT</p>
        </footer>
      </div>
    </div>
  )
}
