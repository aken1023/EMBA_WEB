"use client"

export default function TestAnimationPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">CSS 動畫測試</h1>
        
        <div className="relative w-96 h-96 mx-auto border-2 border-gray-300 rounded-lg overflow-hidden">
          {/* 第一個浮動元素 */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full animate-float"></div>
          
          {/* 第二個浮動元素 */}
          <div className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full animate-float-delayed"></div>
          
          {/* 第三個浮動元素 */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-full animate-float"></div>
        </div>
        
        <p className="mt-8 text-gray-600">
          如果您看到上面的圓圈在上下浮動，說明 CSS 動畫正常工作
        </p>
      </div>
    </div>
  )
} 