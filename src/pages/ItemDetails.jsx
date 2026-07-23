import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./ItemDetails.css"

const ItemDetails = () => {
  const { nftId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItem() {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
      );
      setItem(data);
      setLoading(false);
    }
    fetchItem();
  }, [nftId]);

  if (loading)
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <div className="skeleton" style={{ width: "100%", height: 400, borderRadius: 8 }}></div>
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <div className="skeleton" style={{ width: "60%", height: 32, marginBottom: 20 }}></div>
                  <div className="skeleton" style={{ width: "30%", height: 20, marginBottom: 20 }}></div>
                  <div className="skeleton" style={{ width: "100%", height: 80, marginBottom: 20 }}></div>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <div className="skeleton" style={{ width: 50, height: 50, borderRadius: "50%" }}></div>
                      <div className="skeleton" style={{ width: 100, height: 16, marginTop: 8 }}></div>
                    </div>
                    <div>
                      <div className="skeleton" style={{ width: 50, height: 50, borderRadius: "50%" }}></div>
                      <div className="skeleton" style={{ width: 100, height: 16, marginTop: 8 }}></div>
                    </div>
                  </div>
                  <div className="skeleton" style={{ width: "20%", height: 24, marginTop: 40 }}></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
  if (!item) return <div>Item not found</div>;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={item.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={item.title}
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{item.title} #{item.tag}</h2>
                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i> {item.views || 250}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i> {item.likes}
                    </div>
                  </div>
                  <p>
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis et
                    quasi architecto beatae vitae dicta sunt explicabo.
                  </p>

                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${item.creatorId}`}>
                            <img className="lazy" src={item.creatorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${item.creatorId}`}>
                            <span>{item.creatorName}</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${item.ownerId}`}>
                            <img className="lazy" src={item.ownerImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${item.ownerId}`}>
                            <span>{item.ownerName}</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="spacer-40"></div>

                  <div className="de_tab">
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/0/05/Ethereum_logo_2014.svg"
                        alt="ETH"
                        style={{ width: 16, marginRight: 8 }}
                      />
                      <span>{item.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;