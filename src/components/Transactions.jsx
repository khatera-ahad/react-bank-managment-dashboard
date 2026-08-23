// components/Sidebar.jsx
import './Sidebar.css';

export default function Sidebar({ navItems, activeItem }) {
    const handleNavClick = (item) => {
        alert(`${item} clicked`);
    };

    return (
        <div className="sidebar">
            <ul className="nav-links">
                {navItems.map((item) => (
                    <li 
                        key={item}
                        className={activeItem === item ? 'active' : ''}
                        onClick={() => handleNavClick(item)}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}