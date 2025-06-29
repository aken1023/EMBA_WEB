"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Save, Globe, Mail, Shield, Database, Bell, Upload, AlertCircle, CheckCircle } from "lucide-react"

export default function SystemSettings() {
  const [settings, setSettings] = useState({
    siteName: "中山大學EMBA 校友聯誼網",
    siteDescription: "連結全球中山大學EMBA校友，打造最具價值的商業人脈網絡平台",
    contactEmail: "info@中山大學EMBA-alumni.com",
    allowRegistration: true,
    requireApproval: true,
    enableNotifications: true,
    enableEmailNotifications: true,
    maintenanceMode: false,
    maxFileSize: "50",
    allowedFileTypes: "pdf,doc,docx,jpg,png",
    sessionTimeout: "24",
    passwordMinLength: "8",
    enableTwoFactor: false,
    backupFrequency: "daily",
    logRetention: "30",
  })

  const handleSave = () => {
    console.log("Saving settings:", settings)
    // 儲存設定邏輯
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setSettings((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">系統設定</h1>
          <p className="text-gray-600">管理網站基本設定與系統參數</p>
        </div>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          儲存設定
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">一般設定</TabsTrigger>
          <TabsTrigger value="security">安全設定</TabsTrigger>
          <TabsTrigger value="notifications">通知設定</TabsTrigger>
          <TabsTrigger value="files">檔案設定</TabsTrigger>
          <TabsTrigger value="system">系統設定</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                網站基本資訊
              </CardTitle>
              <CardDescription>設定網站名稱、描述等基本資訊</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="siteName">網站名稱</Label>
                <Input
                  id="siteName"
                  value={settings.siteName}
                  onChange={(e) => handleInputChange("siteName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteDescription">網站描述</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => handleInputChange("siteDescription", e.target.value)}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmail">聯絡信箱</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>註冊設定</CardTitle>
              <CardDescription>控制用戶註冊與審核流程</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>開放註冊</Label>
                  <p className="text-sm text-gray-600">允許新用戶註冊帳戶</p>
                </div>
                <Switch
                  checked={settings.allowRegistration}
                  onCheckedChange={(checked) => handleInputChange("allowRegistration", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>需要審核</Label>
                  <p className="text-sm text-gray-600">新註冊用戶需要管理員審核</p>
                </div>
                <Switch
                  checked={settings.requireApproval}
                  onCheckedChange={(checked) => handleInputChange("requireApproval", checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>維護模式</CardTitle>
              <CardDescription>啟用維護模式將暫停網站服務</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <Label>維護模式</Label>
                  <p className="text-sm text-gray-600">啟用後只有管理員可以訪問</p>
                </div>
                <Switch
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => handleInputChange("maintenanceMode", checked)}
                />
              </div>
              {settings.maintenanceMode && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 text-yellow-600 mr-2" />
                    <span className="text-sm text-yellow-800">維護模式已啟用，一般用戶無法訪問網站</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                密碼政策
              </CardTitle>
              <CardDescription>設定用戶密碼安全要求</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="passwordMinLength">最小密碼長度</Label>
                <Select
                  value={settings.passwordMinLength}
                  onValueChange={(value) => handleInputChange("passwordMinLength", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6">6 個字元</SelectItem>
                    <SelectItem value="8">8 個字元</SelectItem>
                    <SelectItem value="10">10 個字元</SelectItem>
                    <SelectItem value="12">12 個字元</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sessionTimeout">登入逾時 (小時)</Label>
                <Select
                  value={settings.sessionTimeout}
                  onValueChange={(value) => handleInputChange("sessionTimeout", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 小時</SelectItem>
                    <SelectItem value="8">8 小時</SelectItem>
                    <SelectItem value="24">24 小時</SelectItem>
                    <SelectItem value="168">7 天</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>雙重驗證</Label>
                  <p className="text-sm text-gray-600">強制用戶啟用雙重驗證</p>
                </div>
                <Switch
                  checked={settings.enableTwoFactor}
                  onCheckedChange={(checked) => handleInputChange("enableTwoFactor", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                通知設定
              </CardTitle>
              <CardDescription>管理系統通知與郵件設定</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>啟用通知</Label>
                  <p className="text-sm text-gray-600">啟用系統內通知功能</p>
                </div>
                <Switch
                  checked={settings.enableNotifications}
                  onCheckedChange={(checked) => handleInputChange("enableNotifications", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>郵件通知</Label>
                  <p className="text-sm text-gray-600">發送重要通知到用戶信箱</p>
                </div>
                <Switch
                  checked={settings.enableEmailNotifications}
                  onCheckedChange={(checked) => handleInputChange("enableEmailNotifications", checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                郵件伺服器設定
              </CardTitle>
              <CardDescription>設定 SMTP 郵件伺服器</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>SMTP 主機</Label>
                  <Input placeholder="smtp.gmail.com" />
                </div>
                <div className="space-y-2">
                  <Label>SMTP 埠號</Label>
                  <Input placeholder="587" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>用戶名稱</Label>
                  <Input placeholder="your-email@gmail.com" />
                </div>
                <div className="space-y-2">
                  <Label>密碼</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>
              </div>
              <Button variant="outline">
                <Mail className="h-4 w-4 mr-2" />
                測試郵件連線
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="files" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="h-5 w-5 mr-2" />
                檔案上傳設定
              </CardTitle>
              <CardDescription>管理檔案上傳限制與類型</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="maxFileSize">最大檔案大小 (MB)</Label>
                <Select value={settings.maxFileSize} onValueChange={(value) => handleInputChange("maxFileSize", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 MB</SelectItem>
                    <SelectItem value="25">25 MB</SelectItem>
                    <SelectItem value="50">50 MB</SelectItem>
                    <SelectItem value="100">100 MB</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="allowedFileTypes">允許的檔案類型</Label>
                <Input
                  id="allowedFileTypes"
                  value={settings.allowedFileTypes}
                  onChange={(e) => handleInputChange("allowedFileTypes", e.target.value)}
                  placeholder="pdf,doc,docx,jpg,png"
                />
                <p className="text-sm text-gray-500">用逗號分隔多個檔案類型</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2" />
                資料庫設定
              </CardTitle>
              <CardDescription>資料庫備份與維護設定</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>備份頻率</Label>
                <Select
                  value={settings.backupFrequency}
                  onValueChange={(value) => handleInputChange("backupFrequency", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">每日</SelectItem>
                    <SelectItem value="weekly">每週</SelectItem>
                    <SelectItem value="monthly">每月</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>日誌保留天數</Label>
                <Select
                  value={settings.logRetention}
                  onValueChange={(value) => handleInputChange("logRetention", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 天</SelectItem>
                    <SelectItem value="30">30 天</SelectItem>
                    <SelectItem value="90">90 天</SelectItem>
                    <SelectItem value="365">1 年</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Database className="h-4 w-4 mr-2" />
                  立即備份
                </Button>
                <Button variant="outline">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  檢查系統狀態
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>系統資訊</CardTitle>
              <CardDescription>當前系統狀態與版本資訊</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>系統版本</Label>
                  <div className="flex items-center">
                    <Badge variant="outline">v2.1.0</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>資料庫狀態</Label>
                  <div className="flex items-center">
                    <Badge className="bg-green-100 text-green-800">正常</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>最後備份</Label>
                  <p className="text-sm text-gray-600">2024-11-20 03:00:00</p>
                </div>
                <div className="space-y-2">
                  <Label>系統負載</Label>
                  <p className="text-sm text-gray-600">CPU: 15% | 記憶體: 45%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
