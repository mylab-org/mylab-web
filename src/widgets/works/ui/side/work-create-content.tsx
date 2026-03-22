import { CreateWorkForm } from '@/features/works'

export const WorkCreateContent = () => {
  return (
    <div className={'flex min-h-0 w-full flex-1 flex-col gap-2.5 px-5 lg:w-[750px] lg:px-7.5'}>
      <CreateWorkForm />
    </div>
  )
}
