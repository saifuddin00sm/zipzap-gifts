import React, {useState} from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Button, Image, Col } from "react-bootstrap";
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import {Link} from 'react-router-dom';
import { ReactComponent as PeopleSVG} from "../../icons/people-fill.svg";
import { ReactComponent as GiftSVG} from "../../icons/gift-fill.svg";
import { ReactComponent as PersonCircleSVG} from "../../icons/person-circle.svg";
import { ReactComponent as ReceiptSVG} from "../../icons/receipt-cutoff.svg";
import { ReactComponent as ShopWindowSVG} from "../../icons/shop-window.svg";
import { ReactComponent as QuestionSVG} from "../../icons/question-circle-fill.svg";
import { ReactComponent as ArrowLeftSVG} from "../../icons/arrow-left-square-fill.svg";
import { ReactComponent as ArrowRightSVG} from "../../icons/arrow-right-square-fill.svg";
import { ReactComponent as PersonalLogo} from "../../icons/PersonalLogo.svg";


function SideBarComponent() {
    const history = useHistory();
    const location = useLocation();
    const [expanded, setExpanded] = useState(true);

    const handleExpanded = () => {
        setExpanded(!expanded);
    }
    
    // console.log()

    return (
        <>

        {expanded ? 
        (
            <Col xs="2">
            <nav className="nav-menu">
                <ul className="nav-menu-items">
                    <li className="main-menu-button">
                    <Button onClick={handleExpanded} variant="light">
                        <ArrowLeftSVG />
                        <Image src="https://s3.amazonaws.com/app.zipzapgifts.com/Wordmark_Grey.png" alt="zip zap logo" className="menu-logo"/>
                        {/* <ArrowLeftSVG /> */}
                    </Button>
                    </li>
                    {/* <li>
                        <Link to="/profile" >
                            <Image rounded src="https://s3.amazonaws.com/app.zipzapgifts.com/PersonalLogo+(1).png" className="personImage" roundedCircle></Image>
                        </Link>
                        
                    </li> */}
                    {location.pathname === "/" ? 
                    (
                        <li className="menu-text menu-text-highlighted">
                            <span className="green-highlight"></span>
                            <Link to="/" >
                                <GiftSVG/> <span className="link-title">Gift Dashboard</span>
                            </Link>
                        </li>
                    ) : 
                    (
                        <li className="menu-text">
                            <Link to="/" >
                                <GiftSVG/> <span className="link-title">Gift Dashboard</span>
                            </Link>
                        </li>
                    )}
                    {location.pathname === "/recipients" ? 
                    (
                        <li className="menu-text menu-text-highlighted">
                            <span className="green-highlight"></span>
                            <Link to="/recipients" >
                                <PeopleSVG /> <span className="link-title">Recipients</span>
                            </Link>
                        </li>
                    ) : 
                    (
                        <li className="menu-text">
                            <Link to="/recipients" >
                                <PeopleSVG /> <span className="link-title">Recipients</span>
                            </Link>
                        </li>
                    )}
                    {location.pathname === "/order/past" ? 
                    (
                        <li className="menu-text menu-text-highlighted">
                            <span className="green-highlight"></span>
                            <Link to="/order/past">
                                <ReceiptSVG />
                                <span className="link-title">Orders</span>
                            </Link>
                        </li>
                    ) : 
                    (
                        <li className="menu-text">
                            <Link to="/order/past">
                                <ReceiptSVG />
                                <span className="link-title">Orders</span>
                            </Link>
                        </li>
                    )}
                    {location.pathname === "/profile" ? 
                    (
                        <li className="menu-text menu-text-highlighted">
                            <span className="green-highlight"></span>
                            <Link to="/profile">
                                <PersonCircleSVG /> 
                                <span className="link-title">Profile</span>
                            </Link>
                        </li>
                    ) : 
                    (
                        <li className="menu-text">
                            <Link to="/profile">
                                <PersonCircleSVG /> 
                                <span className="link-title">Profile</span>
                            </Link>
                        </li>
                    )}
                    {location.pathname === "/gifts" ? 
                    (
                        <li className="menu-text menu-text-highlighted">
                            <span className="green-highlight"></span>
                            <li className="menu-text">
                                <Link to="/gifts">
                                    <ShopWindowSVG />
                                    <span className="link-title">Gift Catalog</span>
                                </Link>
                            </li>
                        </li>
                    ) : 
                    (
                        <li className="menu-text">
                            <Link to="/gifts">
                                <ShopWindowSVG />
                                <span className="link-title">Gift Catalog</span>
                            </Link>
                        </li>
                    )}
                    {location.pathname === "/help" ? 
                    (
                        <li className="menu-text menu-text-highlighted">
                            <span className="green-highlight"></span>
                            <li className="menu-text">
                                <Link to="/gifts">
                                    <QuestionSVG />
                                    <span className="link-title">Help</span>
                                </Link>
                            </li>
                        </li>
                    ) : 
                    (
                        <li className="menu-text">
                            <Link to="/help">
                                <QuestionSVG />
                                <span className="link-title">Help</span>
                            </Link>
                        </li>
                    )}
                    
                </ul>
            </nav>
            </Col>
        )
        : 
        (
            <Col xs="1">
            <nav className="nav-menu">
                <ul className="nav-menu-items">
                <li className="menu-toggle">
                        <Button onClick={handleExpanded} variant="light">
                            <ArrowRightSVG />
                        </Button>
                    </li>
                    <li className="menu-text">
                        <Link to="/" >
                            <GiftSVG/> 
                        </Link>
                    </li>
                    <li className="menu-text">
                        <Link to="/recipients" >
                            <PeopleSVG /> 
                        </Link>
                    </li>
                    <li className="menu-text">
                        <Link to="/profile">
                            <PersonCircleSVG /> 
                        </Link>
                    </li>
                    <li className="menu-text">
                        <Link to="/order/past">
                            <ReceiptSVG />
                        </Link>
                    </li>
                    <li className="menu-text">
                        <Link to="/gifts">
                            <ShopWindowSVG />
                        </Link>
                    </li>
                    <li className="menu-text">
                        <Link to="/help">
                            <QuestionSVG />
                        </Link>
                    </li>
                </ul>
            </nav>
            </Col>
        )}
        </>
    );
}

export default SideBarComponent;
