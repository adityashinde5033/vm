type Props = {
  html: string;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
};

export default function RichText({ html, as: Tag = 'span', className }: Props) {
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
