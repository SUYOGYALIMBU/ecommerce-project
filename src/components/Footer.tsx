import React from 'react'

// 1. Defining standard object structure for link shapes
const defaultLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Contact Support", href: "/contact" }
]

// 2. Destructuring props directly in the parameters with default fallback values
const Footer = ({ 
    companyName = "Your Company", 
    links = defaultLinks 
}) => {
    return (
        <footer style={{ padding: '20px', borderTop: '1px solid #ccc', marginTop: 'auto' }}>
            <p>&copy; {new Date().getFullYear()} {companyName}. All rights reserved.</p>
            
            {links.length > 0 && (
                <nav style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                    {links.map((link, index) => (
                        <a key={index} href={link.href} style={{ textDecoration: 'none', color: '#0066cc' }}>
                            {link.label}
                        </a>
                    ))}
                </nav>
            )}
        </footer>
    )
}

export default Footer
