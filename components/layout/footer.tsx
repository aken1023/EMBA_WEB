import Link from "next/link"
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">EMBA 校友聯誼網</h3>
            <p className="text-gray-300 mb-4">
              連結全球EMBA校友，打造最具價值的商業人脈網絡平台。 分享智慧、創造機會、共同成長。
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-300 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">快速連結</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/about" className="hover:text-white">
                  關於我們
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-white">
                  活動資訊
                </Link>
              </li>
              <li>
                <Link href="/forum" className="hover:text-white">
                  討論論壇
                </Link>
              </li>
              <li>
                <Link href="/network" className="hover:text-white">
                  人脈網絡
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  聯絡我們
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">聯絡資訊</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                info@emba-alumni.com
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                +886-2-1234-5678
              </li>
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                台北市信義區信義路五段7號
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">© 2024 EMBA 校友聯誼網. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-300 hover:text-white text-sm">
              隱私政策
            </Link>
            <Link href="/terms" className="text-gray-300 hover:text-white text-sm">
              使用條款
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
