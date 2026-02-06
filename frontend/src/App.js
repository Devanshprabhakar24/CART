import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import './styles/App.css';

function App() {
    const [currentView, setCurrentView] = useState('products');

    return (
        <div className="app">
            <Navbar currentView={currentView} setCurrentView={setCurrentView} />

            <main className="main-content">
                {currentView === 'products' ? <ProductList /> : <Cart />}
            </main>

            <footer className="footer">
                <p>&copy; 2026 Naksh Jewels. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default App;
