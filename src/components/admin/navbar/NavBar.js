import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import './NavBar.css'; 

const drawerWidth = 240;

const NavBar = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
    }
    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    marginTop: '64px', 
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <List>
                <ListItem 
                    button 
                    component={NavLink} 
                    to="/admin/movies"
                    className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}
                >
                    <ListItemText primary="Movies" />
                </ListItem>
                <Divider />
                <ListItem 
                    button 
                    component={NavLink} 
                    to="/admin/schedules"
                    className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}
                >
                    <ListItemText primary="Schedules" />
                </ListItem>
                <Divider />
                <ListItem 
                    button 
                    component={NavLink} 
                    to="/admin/categories"
                    className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}
                >
                    <ListItemText primary="Categories" />
                </ListItem>
                <Divider />
                <ListItem 
                    button 
                    component={NavLink} 
                    to="/admin/users"
                    className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}
                >
                    <ListItemText primary="Users" />
                </ListItem>
                <Divider />
                <ListItem 
                    button 
                    component={NavLink} 
                    to="/admin/statistics"
                    className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}
                >
                    <ListItemText primary="Statistics" />
                </ListItem>
                <Divider />
                <ListItem 
                    button 
                    component={NavLink} 
                    to="/admin/account"
                    className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}
                >
                    <ListItemText primary="Account" />
                </ListItem>
                <Divider />
                <ListItem 
                    button 
                    component={NavLink} 
                    to="/admin/discount"
                    className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}
                >
                    <ListItemText primary="Discount" />
                </ListItem>
                <Divider />
                <ListItem 
                    button 
                    style={{fontWeight: "bold", color: "red"}}
                    onClick={handleLogout}
                >
                    <ListItemText primary="Logout" />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default NavBar;
