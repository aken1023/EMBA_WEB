"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { generateMultiplePoeticDescriptions, generateContextualDescription } from "@/lib/ai-description"
import { Sparkles, RefreshCw, Copy, Check, Wand2 } from "lucide-react"

interface PoeticDescriptionGeneratorProps {
  originalCaption: string
  tags: string[]
  onDescriptionSelect: (description: string) => void
  context?: "event" | "class" | "academic" | "sports" | "casual"
}

export function PoeticDescriptionGenerator({
  originalCaption,
  tags,
  onDescriptionSelect,
  context = "casual",
}: PoeticDescriptionGeneratorProps) {
  const [descriptions, setDescriptions] = useState<{ style: string; description: string }[]>([])
  const [selectedDescription, setSelectedDescription] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const generateDescriptions = async () => {
    setIsGenerating(true)

    // 模擬AI生成延遲
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newDescriptions = generateMultiplePoeticDescriptions(originalCaption, tags, 4)

    // 添加情境描述
    const contextualDesc = generateContextualDescription(context, originalCaption)
    newDescriptions.push({
      style: "情境描述",
      description: contextualDesc,
    })

    setDescriptions(newDescriptions)
    setIsGenerating(false)
  }

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error("複製失敗:", err)
    }
  }

  const selectDescription = (description: string) => {
    setSelectedDescription(description)
    onDescriptionSelect(description)
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-amber-200/50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-amber-800 flex items-center">
          <Wand2 className="h-5 w-5 mr-2" />
          AI詩意描述生成器
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 原始描述 */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-amber-800">原始描述</label>
          <div className="p-3 bg-amber-50/50 rounded-lg border border-amber-200/50">
            <p className="text-sm text-gray-700">{originalCaption || "無描述"}</p>
          </div>
        </div>

        {/* 標籤 */}
        {tags.length > 0 && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-amber-800">相關標籤</label>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* 生成按鈕 */}
        <Button
          onClick={generateDescriptions}
          disabled={isGenerating}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              生成中...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              生成詩意描述
            </>
          )}
        </Button>

        {/* 生成的描述 */}
        {descriptions.length > 0 && (
          <div className="space-y-3">
            <label className="text-sm font-medium text-amber-800">AI生成的詩意描述</label>
            {descriptions.map((desc, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer hover:shadow-md ${
                  selectedDescription === desc.description
                    ? "border-amber-400 bg-amber-50"
                    : "border-amber-200/50 bg-white/50 hover:border-amber-300"
                }`}
                onClick={() => selectDescription(desc.description)}
              >
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="outline" className="border-amber-300 text-amber-700 text-xs">
                    {desc.style}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      copyToClipboard(desc.description, index)
                    }}
                    className="h-6 w-6 p-0 hover:bg-amber-100"
                  >
                    {copiedIndex === index ? (
                      <Check className="h-3 w-3 text-green-600" />
                    ) : (
                      <Copy className="h-3 w-3 text-amber-600" />
                    )}
                  </Button>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{desc.description}</p>
                {selectedDescription === desc.description && (
                  <div className="mt-2 text-xs text-amber-600 flex items-center">
                    <Check className="h-3 w-3 mr-1" />
                    已選擇此描述
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* 自定義描述 */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-amber-800">自定義描述</label>
          <Textarea
            placeholder="您也可以手動輸入詩意的描述..."
            value={selectedDescription}
            onChange={(e) => {
              setSelectedDescription(e.target.value)
              onDescriptionSelect(e.target.value)
            }}
            rows={3}
            className="border-amber-200/50 focus:border-amber-400 focus:ring-amber-200"
          />
        </div>

        {/* 使用提示 */}
        <div className="text-xs text-gray-500 bg-amber-50/30 p-3 rounded-lg border border-amber-200/30">
          <p className="flex items-center mb-1">
            <Sparkles className="h-3 w-3 mr-1 text-amber-600" />
            AI會根據原始描述和標籤生成富有詩意的文字
          </p>
          <p>• 古典雅韻：使用傳統文言文風格</p>
          <p>• 現代詩意：融合現代語言的詩意表達</p>
          <p>• 俳句風格：簡潔優美的三行詩</p>
          <p>• 情境描述：根據場景生成合適的描述</p>
        </div>
      </CardContent>
    </Card>
  )
}
