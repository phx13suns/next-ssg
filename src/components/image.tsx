import NextImage, { ImageProps } from 'next/image'

type Props = ImageProps

export const Image: React.FC<Props> = props => {
  return <NextImage {...props} alt={props.alt} />
}
