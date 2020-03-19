import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm } from '../utils/typography';

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    avatar: file(absolutePath: { regex: "/me.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        title
        author
        social {
          github
          twitter
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`;

export default (props) => {
  const page = props.data.markdownRemark;
  const siteTitle = props.data.site.siteMetadata.title;
  const { author, social } = props.data.site.siteMetadata;

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO
        title={page.frontmatter.title}
        description={page.frontmatter.description || page.excerpt}
      />      
      <article>
        <section dangerouslySetInnerHTML={{ __html: page.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
      </article>
    </Layout>
  );
};
