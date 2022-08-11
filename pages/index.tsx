import {GetServerSideProps, NextPage} from "next";
import Home from "../features/Page/homepage";
import {GET_HOMEPAGE, HomepageProps} from "../components/Page/queries/GET_HOMEPAGE";
import { initializeApollo } from "../lib/apolloClient";
import parse, {
    attributesToProps,
    HTMLReactParserOptions,
  } from "html-react-parser";

const Homepage:NextPage<HomepageProps> = ({ data }) => {
    const props = {}
    console.log(data)
  return <Home {...props} />;
}

export const getServerSideProps: GetServerSideProps = async() => {
  const client = await initializeApollo();
  const response = await client.query({
    query: GET_HOMEPAGE,
    variables: { uri: '/' }
  });

  return {
    props: {
      data: response.data,
    }
  }
}

export default Homepage;