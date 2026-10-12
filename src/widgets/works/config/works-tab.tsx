import { WorkSideCardList } from '../ui/side/side-tab-content/work-side-card-list'
import { WorkSideChat } from '../ui/side/side-tab-content/work-side-chat'

export const WORKS_DETAIL_TAB = [
  {
    name: '업무 진척도',
    content: <WorkSideCardList />,
  },
  {
    name: '업무 소통란',
    content: <WorkSideChat />,
  },
]
