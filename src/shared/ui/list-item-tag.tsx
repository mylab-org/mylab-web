const TagBlue = () => {
  return <span className={'bg-tag1 h-[10px] w-[10px] rounded-full'} />
}

const TagRed = () => {
  return <span className={'bg-tag2 h-[10px] w-[10px] rounded-full'} />
}

export const ListItemTag = Object.assign(() => null, {
  Blue: TagBlue,
  Red: TagRed,
})
