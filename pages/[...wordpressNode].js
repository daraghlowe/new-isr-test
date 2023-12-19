import { getWordPressProps, WordPressTemplate } from "@faustwp/core";

export default function Page(props) {
  return <WordPressTemplate {...props} />;
}

export function getStaticProps(ctx) {
  return getWordPressProps({
    ctx,
    revalidate: Number(process.env.FAUST_REVALIDATE_INTERVAL),
  });
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
