import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './NavBar.css';
import home from '../../assets/icons/nav-home.png'
import explore from '../../assets/icons/nav-explore.png'
import chat from '../../assets/icons/nav-chat.png'
import map from '../../assets/icons/nav-map.png'

import inhome from '../../assets/icons/nav-in-home.png'
import inexplore from '../../assets/icons/nav-in-explore.png'
import inchat from '../../assets/icons/nav-in-chat.png'
import inmap from '../../assets/icons/nav-in-map.png'

export const NavBar = () => {
    
    const location = useLocation();

    return (
        <div className="navbar">
            <NavLink exact to="/" className='nav-home' isActive={() => location.pathname === '/'}>
                {location.pathname === '/' ? <img src={inhome} alt='home' /> : <img src={home} alt='home' />}
            </NavLink>

            <NavLink to="/explore" className='nav-explore' isActive={() => location.pathname === '/explore'}>
                {location.pathname === '/explore' ? <img src={inexplore} alt='explore' /> : <img src={explore} alt='explore' />}
            </NavLink>

            <NavLink to="/map" className='nav-map' isActive={() => location.pathname === '/map'}>
                {location.pathname === '/map' ? <img src={inmap} alt='map' /> : <img src={map} alt='map' />}
            </NavLink>

            <NavLink to="/chat" className='nav-chat' isActive={() => location.pathname === '/chat'}>
                {location.pathname === '/chat' ? <img src={inchat} alt='chat' /> : <img src={chat} alt='chat' />}
            </NavLink>
        </div>
    

        // <div className="navbar">
        //     <NavLink to="/" activeClassName="active">
        //         <img src={home} alt='home'/>
        //     </NavLink>

        //     <NavLink to="/explore" activeClassName="active">
        //         <img src={explore} alt='explore'/>
        //     </NavLink>

        //     <NavLink to="/map" activeClassName="active">
        //         <img src={map} alt='map'/>
        //     </NavLink>

        //     <NavLink to="/chat" activeClassName="active">
        //         <img src={chat} alt='chat'/>
        //     </NavLink>
        // </div>

    );
}