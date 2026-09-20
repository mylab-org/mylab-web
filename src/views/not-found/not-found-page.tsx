'use client'

import { motion } from 'framer-motion'
import { Image } from 'next/dist/client/image-component'
import { Button } from '@/shared/ui/override/button'
import { Text } from '@/shared/ui/override/text'

export const NotFoundPage = () => {
  return (
    <main className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden bg-[#f4f6f9]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_20%,rgba(37,98,205,0.18),transparent_55%),radial-gradient(ellipse_at_85%_80%,rgba(54,65,83,0.14),transparent_50%)]"
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-28 -left-20 h-72 w-72 rounded-full bg-[#2562CD]/20 blur-3xl"
        animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-16 -bottom-24 h-80 w-80 rounded-full bg-[#364153]/15 blur-3xl"
        animate={{ opacity: [0.25, 0.55, 0.25], scale: [1.05, 1, 1.05] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 flex w-full max-w-xl flex-col items-center px-6 py-16 text-center">
        <motion.div
          className="mb-10 flex items-center gap-3"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <Image src="/MyLab_Logo.png" alt="MyLab" width={44} height={44} />
          <span className="text-[28px] font-black tracking-tighter text-gray-900">
            My<b className="text-[#2562CD]">Lab</b>
          </span>
        </motion.div>

        <motion.p
          className="bg-gradient-to-b from-[#2562CD] to-[#364153] bg-clip-text text-[96px] leading-none font-black tracking-tighter text-transparent md:text-[128px]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
        >
          404
        </motion.p>

        <motion.div
          className="mt-6 flex flex-col gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18 }}
        >
          <h1 className="text-[24px] font-bold text-gray-900 md:text-[32px]">페이지를 찾을 수 없습니다</h1>
          <Text className="text-[14px] font-medium whitespace-pre-wrap text-gray-500! md:text-[16px]">
            {'요청하신 페이지가 없거나 이동되었을 수 있어요.\n주소를 다시 확인해 주세요.'}
          </Text>
        </motion.div>

        <motion.div
          className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.28 }}
        >
          <Button.Link
            href="/"
            target="_self"
            color="main"
            className="bg-main flex w-full items-center justify-center rounded-[10px] px-8 py-4 text-[14px] font-bold text-white hover:bg-gray-900 md:text-[16px]"
          >
            홈으로 이동
          </Button.Link>
          <Button.Link
            href="/login"
            target="_self"
            className="flex w-full items-center justify-center rounded-[10px] border border-gray-300 bg-white px-8 py-4 text-[14px] font-bold text-gray-800 transition-colors hover:bg-gray-50 md:text-[16px]"
          >
            로그인
          </Button.Link>
        </motion.div>
      </div>
    </main>
  )
}
