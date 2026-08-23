// components/Navbar.jsx
import './Navbar.css';

export default function Navbar({ brand }) {
    const handleClick = () => {
        alert('Menu Icon was clicked');
    };

    return (
        <nav className="navbar">
            <ul>
                <li className="brand">
                    <span className="brand-icon">🏦</span>
                    <span className="brand-name">{brand.name}</span>
                </li>
                <li className="subtitle">{brand.subtitle}</li>
                <li onClick={handleClick} className="menu-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                </li>
            </ul>
        </nav>
    );
}