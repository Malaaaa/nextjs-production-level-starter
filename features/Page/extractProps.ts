import {
    GQLContentNode,
    GQLMediaItem,
    GQLMenu,
    Maybe,
    Scalars,
  } from "../../gql.generated";
  import { ApolloError } from "@apollo/client";
  import domToReact from "html-react-parser/lib/dom-to-react";
  
  export type PageActionsProps = {
    className?: string;
    menus?: GQLMenu[];    // Per Page requirements
    error?: ApolloError;
    loading?: boolean;
    title?: string;
    uri?: string;
    link?: string;
    content?: ReturnType<typeof domToReact>;
    ancestors?: GQLContentNode[];
    featuredImage?: GQLMediaItem;
    hideFeaturedImage?: boolean;
    status?: string;
    isPreview?: boolean;
  };
  