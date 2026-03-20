import { CreateWorkForm } from '@/features/works'

export const WorkCreateContent = () => {
  return (
    <div className={'flex min-h-0 w-full flex-1 flex-col gap-[10px] px-[20px] lg:w-[750px] lg:px-[30px]'}>
      <CreateWorkForm />
    </div>
  )
}
