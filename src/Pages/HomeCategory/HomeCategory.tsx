
interface Props {
    category: string
}
const HomeCategory = ({category}: Props) => {
  return (
    <div>{category}</div>
  )
}

export default HomeCategory