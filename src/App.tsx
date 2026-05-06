import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { ClipboardCopy, Sparkles, Trash2, Loader2 } from "lucide-react"
import { TrustBanner } from "@/components/TrustBanner"
import { History } from "@/components/History"

interface HistoryItem {
  id: string;
  original: string;
  humanized: string;
  timestamp: number;
}

export default function App() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
  const [history, setHistory] = useState<HistoryItem[]>([])

  // Load history from LocalStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('humanizer_history')
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory))
    }
  }, [])

  // Save history to LocalStorage
  const saveToHistory = (original: string, humanized: string) => {
    const newItem: HistoryItem = {
      id: Math.random().toString(36).substr(2, 9),
      original,
      humanized,
      timestamp: Date.now()
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
    }, 3000)

    try {
      const response = await fetch('http://localhost:3001/api/humanize', {
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
      saveToHistory(inputText, data.output)
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
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">Humanizer AI</h1>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Transform AI-generated text into natural, human-written prose that bypasses detection.
          </p>
        </header>

        {/* Main Tool */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Input Section */}
          <div className="space-y-6">
            <Card className="border-slate-200 shadow-sm overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div className="space-y-1">
                  <CardTitle className="text-xl">Input Text</CardTitle>
                  <CardDescription>Paste your AI-generated essay or text here.</CardDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleClear}
                  className="text-slate-500 hover:text-red-600"
                  title="Clear input"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea 
                  placeholder="Paste your text here (e.g. Furthermore, it is important to note...)"
                  className="min-h-[400px] resize-none border-slate-200 focus-visible:ring-slate-900"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
                <Button 
                  className="w-full bg-slate-900 text-white hover:bg-slate-800 h-11 text-base font-medium relative"
                  onClick={handleHumanize}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="animate-pulse">{statusMessage}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      <span>Humanize Text</span>
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>
            
            <History items={history} onSelect={handleSelectHistory} />
          </div>

          {/* Output Section */}
          <div className="space-y-6 lg:sticky lg:top-8">
            <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div className="space-y-1">
                  <CardTitle className="text-xl">Humanized Result</CardTitle>
                  <CardDescription>Your natural-sounding text will appear here.</CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleCopy}
                  disabled={!outputText || isLoading}
                  className="border-slate-200"
                >
                  <ClipboardCopy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
              </CardHeader>
              <CardContent>
                {outputText ? (
                  <div className="min-h-[445px] p-4 rounded-md bg-slate-50 border border-slate-200 text-slate-800 whitespace-pre-wrap leading-relaxed">
                    {outputText}
                  </div>
                ) : (
                  <div className="min-h-[445px] flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-100 rounded-md bg-slate-50/50">
                    <Sparkles className="h-12 w-12 mb-4 opacity-10" />
                    <p className="font-medium">Ready to humanize your writing.</p>
                    <p className="text-xs mt-1">Output will appear here after processing.</p>
                  </div>
                )}
                
                <TrustBanner />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer info */}
        <footer className="text-center pt-8 text-slate-400 text-xs tracking-wide">
          <p>© 2026 HUMANIZER AI ENGINE. OPTIMIZED FOR ACADEMIC RIGOR.</p>
        </footer>
      </div>
    </div>
  )
}
