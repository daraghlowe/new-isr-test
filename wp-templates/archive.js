import { useQuery, gql } from "@apollo/client";
import * as MENUS from "../constants/menus";
import { BlogInfoFragment } from "../fragments/GeneralSettings";
import {
  Header,
  Footer,
  Main,
  Container,
  NavigationMenu,
  SEO,
  FeaturedImage,
  EntryHeader,
  LoadMore,
  Posts,
} from "../components";

export default function Component() {
  const { data, loading, fetchMore } = useQuery(Component.query, {
    variables: Component.variables(),
  });

  if (loading) {
    return <>Loading...</>;
  }

  const { title: siteTitle, description: siteDescription } =
    data?.generalSettings;
  const primaryMenu = data?.headerMenuItems?.nodes ?? [];
  const footerMenu = data?.footerMenuItems?.nodes ?? [];

  return (
    <>
      <SEO title={siteTitle} description={siteDescription} />
      <Header
        title={siteTitle}
        description={siteDescription}
        menuItems={primaryMenu}
      />
      <Main>
        <>
          <EntryHeader title={`Blog Posts`} />
          <Container>
            <Posts posts={data.posts} />
            <LoadMore
              className="text-center"
              hasNextPage={data.posts.pageInfo.hasNextPage}
              endCursor={data.posts.pageInfo.endCursor}
              isLoading={loading}
              fetchMore={fetchMore}
            />
          </Container>
        </>
      </Main>
      <Footer title={siteTitle} menuItems={footerMenu} />
    </>
  );
}

Component.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  ${FeaturedImage.fragments.entry}
  query GetPageData(
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
    $first: Int!
    $after: String
  ) {
    posts(first: $first, after: $after) {
      edges {
        node {
          id
          title
          content
          date
          uri
          ...FeaturedImageFragment
          author {
            node {
              name
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
    generalSettings {
      ...BlogInfoFragment
    }
    headerMenuItems: menuItems(where: { location: $headerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
`;

Component.variables = () => {
  return {
    first: 10,
    after: "",
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
  };
};
