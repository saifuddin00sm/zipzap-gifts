import React from "react";
import { Col, Navbar, Nav } from "react-bootstrap";
import {Navigation} from 'react-minimal-side-navigation';
import { useHistory, useLocation } from "react-router-dom";
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import { ReactComponent as GiftCardIcon } from "../../icons/giftCard.svg";

function SideBarComponent() {
    const history = useHistory();
    const location = useLocation();
    return (
        <div className="side-bar-container">
        <Navigation
        // you can use your own router's api to get pathname
            activeItemId={location.pathname}
            onSelect={({ itemId }) => {
                history.push(itemId);
            }}
        items={[
        {
            title: 'Gift Dashboard',
            itemId: '/',
            // you can use your own custom Icon component as well
            // icon is optional
            elemBefore: () => <GiftCardIcon />,
            subNav: [
                {
                    title: 'Add Gift',
                    itemId: '/event/new',
                }
              ],
          },
          {
            title: 'Recipients',
            itemId: '/recipients',
            subNav: [
                {
                    title: 'Upload A List',
                    itemId: '/recipients/upload',
                },
            ],
            // you can use your own custom Icon component as well
            // icon is optional
            // elemBefore: () => <Icon name="inbox" />,
        },
        {
            title: 'Orders',
            itemId: '/order/past',
            // elemBefore: () => <Icon name="users" />,
        },
        {
            title: 'Gift Catalog',
            itemId: '/gifts',
            // subNav: [
            //   {
            //     title: 'Teams',
            //     itemId: '/management/teams',
            //   },
            // ],
          },
        ]}
      />
      </div>
    );
}

export default SideBarComponent;
