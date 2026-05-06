import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { ClipboardCopy, Sparkles, Trash2, Loader2 } from "lucide-react"

export default function App() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleHumanize = () => {
    if (!inputText.trim()) {
      toast.error("Please enter some text first")
      return
    }

    setIsLoading(true)
    // Mock humanization logic
    setTimeout(() => {
      const mockResult = inputText
        .split('. ')
        .map(sentence => {
          // Very basic mock humanization: swap some common AI words
          return sentence
            .replace(/\bFurthermore\b/g, "Plus")
            .replace(/\bMoreover\b/g, "Also")
            .replace(/\bIn conclusion\b/g, "Basically")
        })
        .join('. ')
      
      setOutputText(mockResult + "\n\n---\n[Humanized by AI Engine]")
      setIsLoading(false)
      toast.success("Text humanized successfully!")
    }, 2000)
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <Card className="border-slate-200 shadow-sm">
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
                className="w-full bg-slate-900 text-white hover:bg-slate-800 h-11 text-base font-medium"
                onClick={handleHumanize}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Humanize Text
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card className="border-slate-200 shadow-sm bg-white">
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
                <div className="min-h-[445px] flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-100 rounded-md">
                  <Sparkles className="h-12 w-12 mb-4 opacity-20" />
                  <p>Ready to humanize your writing.</p>
                  <p className="text-sm">Output will appear here.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Footer info */}
        <footer className="text-center pt-8 text-slate-400 text-sm">
          <p>© 2026 Humanizer AI Engine. Optimized for Academic Rigor.</p>
        </footer>
      </div>
    </div>
  )
}
