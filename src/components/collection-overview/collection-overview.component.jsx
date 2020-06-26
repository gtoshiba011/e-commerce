import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./collection-overview.styles.scss";

import CollectionPreview from "../collection-preview/collection-preview.component";
import { selectShopCollectionsForOverview } from "../../redux/shop/shop.selectors";

const CollectionOverview = ({ collections }) => {
  return (
    <div className="collection-overview">
      {collections.map(({ id, ...restProps }) => {
        return <CollectionPreview key={id} {...restProps} />;
      })}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  collections: selectShopCollectionsForOverview,
});

export default connect(mapStateToProps)(CollectionOverview);
