"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, X, Plus, Save, Send, AlertCircle, CheckCircle, Users } from "lucide-react"

export default function UploadPaperPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    title: "",
    abstract: "",
    category: "",
    keywords: [],
    authors: [{ name: "", email: "", affiliation: "" }],
    journal: "",
    publishDate: "",
    pages: "",
    isOpenAccess: false,
    allowComments: true,
    file: null,
  })
  const [newKeyword, setNewKeyword] = useState("")
  const [uploadProgress, setUploadProgress] = useState(0)

  const categories = ["管理策略", "金融投資", "科技創新", "人力資源", "行銷管理", "永續經營", "國際貿易", "創業管理"]

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addKeyword = () => {
    if (newKeyword.trim() && !formData.keywords.includes(newKeyword.trim())) {
      setFormData((prev) => ({
        ...prev,
        keywords: [...prev.keywords, newKeyword.trim()],
      }))
      setNewKeyword("")
    }
  }

  const removeKeyword = (keyword: string) => {
    setFormData((prev) => ({
      ...prev,
      keywords: prev.keywords.filter((k) => k !== keyword),
    }))
  }

  const addAuthor = () => {
    setFormData((prev) => ({
      ...prev,
      authors: [...prev.authors, { name: "", email: "", affiliation: "" }],
    }))
  }

  const updateAuthor = (index: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      authors: prev.authors.map((author, i) => (i === index ? { ...author, [field]: value } : author)),
    }))
  }

  const removeAuthor = (index: number) => {
    if (formData.authors.length > 1) {
      setFormData((prev) => ({
        ...prev,
        authors: prev.authors.filter((_, i) => i !== index),
      }))
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, file }))
      // 模擬上傳進度
      let progress = 0
      const interval = setInterval(() => {
        progress += 10
        setUploadProgress(progress)
        if (progress >= 100) {
          clearInterval(interval)
        }
      }, 200)
    }
  }

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = () => {
    console.log("Submitting paper:", formData)
    // 處理提交邏輯
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">上傳論文</h1>
          <p className="text-gray-600">分享您的研究成果，與校友們交流學術見解</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className={`flex items-center ${currentStep >= 1 ? "text-blue-600" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= 1 ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                1
              </div>
              <span className="ml-2 text-sm font-medium">基本資訊</span>
            </div>
            <div className={`flex items-center ${currentStep >= 2 ? "text-blue-600" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= 2 ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                2
              </div>
              <span className="ml-2 text-sm font-medium">作者資訊</span>
            </div>
            <div className={`flex items-center ${currentStep >= 3 ? "text-blue-600" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= 3 ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                3
              </div>
              <span className="ml-2 text-sm font-medium">檔案上傳</span>
            </div>
          </div>
          <Progress value={(currentStep / 3) * 100} className="h-2" />
        </div>

        <Card>
          <CardContent className="p-6">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">基本資訊</h3>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">論文標題 *</Label>
                  <Input
                    id="title"
                    placeholder="請輸入論文標題"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="abstract">摘要 *</Label>
                  <Textarea
                    id="abstract"
                    placeholder="請輸入論文摘要（建議200-300字）"
                    rows={6}
                    value={formData.abstract}
                    onChange={(e) => handleInputChange("abstract", e.target.value)}
                  />
                  <p className="text-sm text-gray-500">{formData.abstract.length}/300 字</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">研究領域 *</Label>
                    <Select onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="選擇研究領域" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="journal">發表期刊</Label>
                    <Input
                      id="journal"
                      placeholder="期刊名稱（如已發表）"
                      value={formData.journal}
                      onChange={(e) => handleInputChange("journal", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>關鍵字</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      placeholder="輸入關鍵字"
                      value={newKeyword}
                      onChange={(e) => setNewKeyword(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addKeyword())}
                    />
                    <Button type="button" onClick={addKeyword}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.keywords.map((keyword) => (
                      <Badge key={keyword} variant="secondary" className="flex items-center gap-1">
                        {keyword}
                        <button
                          type="button"
                          onClick={() => removeKeyword(keyword)}
                          className="ml-1 hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Author Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">作者資訊</h3>
                  <Button type="button" onClick={addAuthor} variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    新增作者
                  </Button>
                </div>

                {formData.authors.map((author, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        作者 {index + 1}
                        {index === 0 && <Badge className="ml-2">主要作者</Badge>}
                      </h4>
                      {index > 0 && (
                        <Button type="button" onClick={() => removeAuthor(index)} variant="ghost" size="sm">
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>姓名 *</Label>
                        <Input
                          placeholder="作者姓名"
                          value={author.name}
                          onChange={(e) => updateAuthor(index, "name", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>電子郵件</Label>
                        <Input
                          type="email"
                          placeholder="email@example.com"
                          value={author.email}
                          onChange={(e) => updateAuthor(index, "email", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>所屬機構</Label>
                        <Input
                          placeholder="大學或公司名稱"
                          value={author.affiliation}
                          onChange={(e) => updateAuthor(index, "affiliation", e.target.value)}
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Step 3: File Upload */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">檔案上傳與設定</h3>
                </div>

                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <div className="space-y-2">
                      <p className="text-lg font-medium">上傳論文檔案</p>
                      <p className="text-sm text-gray-600">支援 PDF、DOC、DOCX 格式，檔案大小不超過 50MB</p>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <Label htmlFor="file-upload">
                        <Button variant="outline" className="cursor-pointer bg-transparent">
                          選擇檔案
                        </Button>
                      </Label>
                    </div>
                  </div>

                  {formData.file && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-green-600 mr-2" />
                          <span className="font-medium">{formData.file.name}</span>
                        </div>
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <Progress value={uploadProgress} className="h-2" />
                      <p className="text-sm text-green-600 mt-2">上傳完成</p>
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="publishDate">發表日期</Label>
                    <Input
                      id="publishDate"
                      type="date"
                      value={formData.publishDate}
                      onChange={(e) => handleInputChange("publishDate", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pages">頁數</Label>
                    <Input
                      id="pages"
                      type="number"
                      placeholder="論文總頁數"
                      value={formData.pages}
                      onChange={(e) => handleInputChange("pages", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="openAccess"
                      checked={formData.isOpenAccess}
                      onCheckedChange={(checked) => handleInputChange("isOpenAccess", checked)}
                    />
                    <Label htmlFor="openAccess">開放取用（允許所有校友免費下載）</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="allowComments"
                      checked={formData.allowComments}
                      onCheckedChange={(checked) => handleInputChange("allowComments", checked)}
                    />
                    <Label htmlFor="allowComments">允許其他校友評論與討論</Label>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-blue-800 mb-1">上傳須知</p>
                      <ul className="text-blue-700 space-y-1">
                        <li>• 請確保您擁有論文的版權或已獲得授權</li>
                        <li>• 上傳的論文將經過管理員審核</li>
                        <li>• 審核通過後將在論文區公開顯示</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t">
              <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
                上一步
              </Button>

              <div className="flex gap-2">
                <Button variant="outline">
                  <Save className="h-4 w-4 mr-2" />
                  儲存草稿
                </Button>

                {currentStep < 3 ? (
                  <Button onClick={nextStep}>下一步</Button>
                ) : (
                  <Button onClick={handleSubmit}>
                    <Send className="h-4 w-4 mr-2" />
                    提交論文
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
